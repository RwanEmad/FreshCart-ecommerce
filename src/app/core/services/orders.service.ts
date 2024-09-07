import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {


private readonly _HttpClient=inject(HttpClient)
private readonly _AuthService=inject(AuthService)
// myHeaders:any={token:localStorage.getItem('userToken')}


 
userData:any=null;
userId?:any;


checkOut(idCart:string ,shippingDetails:object):Observable<any>{
  return this._HttpClient.post(`${environment.baseUrl}/api/v1/orders/checkout-session/${idCart}?url=${window.location.origin}`,
    {
      "shippingAddress":shippingDetails
    },
  // {
  //   headers:this.myHeaders
  // }
)
}

getAllOrders():Observable<any>{

  if (  localStorage.getItem('userToken')!=null) {
  
    this.userData = jwtDecode(localStorage.getItem('userToken')!);
    // this.userId=this.userData && this.userData.id?this.userData.id:null
    this.userId=this.userData.id
    // console.log('user data' , this.userData.id);
    // console.log('user data' , this.userId);
  }
  // return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this._AuthService.userId}`)
  // console.log('user data' , this.userData.id);
  
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/orders/user/${this.userData.id}`)
  
}



}
