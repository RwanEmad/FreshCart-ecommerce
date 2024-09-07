import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private readonly _HttpClient=inject(HttpClient)
 private readonly _Router=inject(Router)
 
 userData:any=null;
 userId?:any;
 

 setRegisterForm(data:object):Observable<any>
 {
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signup`, data)
 }


setLoginForm(data:object):Observable<any>{

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/signin`,data)

}

saveUserData():void{

  if (  localStorage.getItem('userToken')!=null) {
  
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    // this.userId=this.userData && this.userData.id?this.userData.id:null
    this.userId=this.userData.id
    console.log('user data' , this.userData.id);
    console.log('user data' , this.userId);
    
  }
}

logOut():void{

  localStorage.removeItem('userToken');
  this.userData=null
  this._Router.navigate(['/login'])
}

setEmailVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/forgotPasswords`,data)
}

setCodeVerify(data:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/auth/verifyResetCode`,data)
}


setResetPasword(data:object):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/auth/resetPassword`,data)
}


}
