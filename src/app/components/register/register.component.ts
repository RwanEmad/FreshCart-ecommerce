import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass , ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnDestroy{


  private readonly _AuthService = inject(AuthService)
  private readonly _FormBuilder = inject(FormBuilder)
  private readonly _Router = inject(Router)

  msgError:string=''
  isLoading:boolean=false
  msgSuccess:string=''

  registerSub!:Subscription
  
  //|| registerSub:Subscription = new Subscription()  low performance


  
//  dataForm:object={
//   name:"Rwan Emad",
//   email:"rwanemad@gmail.com",
//   password:"123456",
//   rePassword:"123456",
//   phone:'01019135676'
//  }

// ngOnInit(): void {
//   this.registerForm.patchValue({
//     name: this.dataForm.name,
//     email: this.dataForm.email,
//     password: this.dataForm.password,
//     rePassword: this.dataForm.rePassword,
//     phone: this.dataForm.phone,
//   })
// }



//creating Group
//validators ---> methods validation

registerForm:FormGroup=this._FormBuilder.group({

  name:['',[Validators.required,Validators.minLength(3)]],
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  rePassword:[null,[Validators.required]],
  phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
},{validators:[this.confirmPassword]})



// registerForm:FormGroup=new FormGroup({
//   name:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//   email:new FormControl(null,[Validators.required,Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^\w{6,}$/)]),
//   rePassword:new FormControl(null),
//   phone:new FormControl(null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]),
// },this.confirmPassword)



//when we was check in validation in html we was checked on controls error now form donot has any errors ,its hasnot validation but controls has. 
//when use custom validation it be validation on form now we will check on form error
registerSubmit():void{

  if(this.registerForm.valid){
    
    this.isLoading=true
    this.registerSub=this._AuthService.setRegisterForm(this.registerForm.value).subscribe({
      next: (res) => {

        console.log(res)
        if(res.message=='success'){
          this.msgSuccess=res.message
          setTimeout(()=>{
            this._Router.navigate(['/login',])
          },1000)
         
        }
       
        this.isLoading=false;
        


      },
      error: (err:HttpErrorResponse) => {
      this.msgError=err.error.message
        console.log(err)
        this.isLoading=false
      
      }

    })
    console.log(this.registerForm)
  }
  else{
    this.registerForm.setErrors({mismatch:true})
    this.registerForm.markAllAsTouched()
  }

}

ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
}


//custom validation fun ----> g registerForm

//fun may receive formGroup or formControl if i reused it so if its argu type is FormGroup when reuse it will be error ----> make its argument type (any | AbstractControl )  

confirmPassword(g:AbstractControl){

  if(g.get('password')?.value==g.get('rePassword')?.value){
    return null;
  }else{
    return {mismatch: true};//this error return on form
  }
}



}
