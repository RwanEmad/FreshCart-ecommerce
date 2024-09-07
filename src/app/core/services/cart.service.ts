import { read } from 'fs';
import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {


  private readonly _HttpClient=inject(HttpClient)
  // cartNumber:WritableSignal<number>=signal(0)
  cartNumber:BehaviorSubject<number>=new BehaviorSubject(0)


addProductToCart(id:string):Observable<any>{

  return this._HttpClient.post(`${environment.baseUrl}/api/v1/cart`,//body{}
    {
      productId: id,
    },
    // {
    //   headers:this.myHeaders 
    // }
  )

}

getProductsCart():Observable<any>{
  return this._HttpClient.get(`${environment.baseUrl}/api/v1/cart`,)
}

deleteSpecificCartItem(id:string):Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart/${id}`,)
}

updateProductQuantity(id:string,newCount:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/cart/${id}`,
     {count:newCount}
    )
}

clearCart():Observable<any>{
  return this._HttpClient.delete(`${environment.baseUrl}/api/v1/cart`,)
}

}
