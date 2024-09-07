import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, find, Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { Product } from '../interfaces/icart';
import { IProduct } from '../interfaces/iproduct';
import { IFav } from '../interfaces/ifav';

@Injectable({
  providedIn: 'root'
})
export class WishListService {

   
   
  private readonly _HttpClient=inject(HttpClient)
  favNum:BehaviorSubject<number>=new BehaviorSubject(0)

  wishListItems:IFav[]=[]


  addToWishList(id:string):Observable<any>{
    return this._HttpClient.post(  `${environment.baseUrl}/api/v1/wishlist`,//body{}
      {
        productId: id,
      },)
  }

  removeItemFromWishList(id:string):Observable<any>{
    return this._HttpClient.delete(  `${environment.baseUrl}/api/v1/wishlist/${id}`)
  }

 
  getAllWidhList():Observable<any>{
    
    return this._HttpClient.get(  `${environment.baseUrl}/api/v1/wishlist`)

  }

 isInWishList(product:IProduct,list:IFav[]):any{
  // console.log(Array.isArray(list));
  // console.log(typeof list);
  let arr=Object.values(list)
  // console.log(arr);
    // console.log(arr.some(item => item.id === product.id));
    
  return arr.some(item => item.id === product.id)
  // return  list.some(item=>item.id===product.id)
 
 }
 updateFavsQuantity(id:string,newCount:number):Observable<any>{
  return this._HttpClient.put(`${environment.baseUrl}/api/v1/wishlist/${id}`,
     {count:newCount}
    )
}

}
