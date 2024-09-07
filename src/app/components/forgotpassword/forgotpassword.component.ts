import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ReactiveFormConfig } from '@rxweb/reactive-form-validators';
import { format } from 'path';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgotpassword',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './forgotpassword.component.html',
  styleUrl: './forgotpassword.component.scss'
})
export class ForgotpasswordComponent {


  private readonly _FormBuilder =inject(FormBuilder)
  private readonly _AuthService =inject(AuthService)
  private readonly _Router =inject(Router)

 isLoading:boolean=false
 step:number=1;


 

  verifyEmail:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
  }) 

  
  verifyCode:FormGroup=this._FormBuilder.group({
    resetCode:[null,[Validators.required,Validators.pattern(/^[0-9]{6}$/)]],
  }) 

  resetPassword:FormGroup=this._FormBuilder.group({
    email:[null,[Validators.required,Validators.email]],
    newPassword:[null,[Validators.required,Validators.pattern(/^\w{6,}$/)]],
  }) 



  verifyEmailSubmit():void{

    //****Auto fill email input in form3 */
    let emailvalue=this.verifyEmail.get('email')?.value
    this.resetPassword.get('email')?.patchValue(emailvalue)

    this._AuthService.setEmailVerify(this.verifyEmail.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.statusMsg=='success'){
          this.step=2;
        }
        },
        error: (err) => {
          console.log(err);
          }
    })
  }

  verifyCodeSubmit():void{
    this._AuthService.setCodeVerify(this.verifyCode.value).subscribe({
      next: (res) => {
        console.log(res);
        if(res.status=='Success'){
          this.step=3;
        }
        },
        error: (err) => {
          console.log(err);
          }
    })
  }

  resetPasswordSubmit():void{
    this._AuthService.setResetPasword(this.resetPassword.value).subscribe({
      next: (res) => {
        console.log(res);
       localStorage.setItem('userToken',res.token);
       this._AuthService.saveUserData()
       this._Router.navigate(['/home'])
        },
        error: (err) => {
          console.log(err);
          }
    })
  }



}
