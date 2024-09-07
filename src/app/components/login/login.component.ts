import { HomeComponent } from './../home/home.component';
import { NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {


 private readonly _FormBuilder =inject(FormBuilder)
 private readonly _AuthService =inject(AuthService)
 private readonly _Router =inject(Router)

 msgError:string=''
 isLoading:boolean=false
 msgSuccess:string=''
 name:string=''

 loginForm:FormGroup=this._FormBuilder.group({
  email:[null,[Validators.required,Validators.email]],
  password:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
 })


 loginSubmit():void{
    console.log(this.loginForm);
    
    if(this.loginForm.valid){

      this._AuthService.setLoginForm(this.loginForm.value).subscribe({
        next: (res) => {
        console.log(res.user.name);
        
        if (res.message=='success') {
          this.msgSuccess=res.message
          this.name=res.user.name
          setTimeout(() => {
            //1-save token
            localStorage.setItem('userToken',res.token);
            //2-decode token

            this._AuthService.saveUserData();
                       

            //3-navigate to home
            this._Router.navigate(['/home'])            
          }, 1000);
        }
     
        this.isLoading=false

        },
        error: (err:HttpErrorResponse) => {
        
          this.msgError=err.error.message
          console.log(err);
          this.isLoading=false
          
        }

      })

      this.isLoading=true;
    }




 }


}
