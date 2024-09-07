import { CartService } from './../../core/services/cart.service';
import { Data } from './../../core/interfaces/icart';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ICart } from '../../core/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe,RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss'
})
export class CartComponent implements OnInit, OnDestroy {
   
  private readonly _CartService=inject(CartService)
  getCartProSub?:Subscription 
   

  cartDetails :ICart | null=null
  totalPrice:number=0
  ngOnInit(): void {
    this.getCartProSub= this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails=res
      }

    })
  }

  removeItem(idProduct:string):void{

    this._CartService.deleteSpecificCartItem(idProduct).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails=res
        this._CartService.cartNumber.next(res.numOfCartItems)
        },
  })
}

  updateCount(id:string, count:number):void{

   if(count>0){
    this._CartService.updateProductQuantity(id,count).subscribe({
      next: (res) => {
        console.log(res)
        this.cartDetails=res
        }
    })
   }
  //  else{
  //   this.removeItem(id)
  //  }
  }
  

  RemoveCart():void{
    this._CartService.clearCart().subscribe({
      next: (res) => {
        if(res.message=='success'){
          console.log(res)
            this.cartDetails={data:{
               totalCartPrice:0
            } } as ICart
            this._CartService.cartNumber.next(0)
        }
      },
     
      })
  }

  ngOnDestroy(){
    this.getCartProSub?.unsubscribe()
  }



}
