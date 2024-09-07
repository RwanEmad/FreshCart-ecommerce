import { HttpClient } from '@angular/common/http';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/interfaces/iproduct';
import { NgClass, NgStyle } from '@angular/common';
import { WishListService } from '../../core/services/wish-list.service';
import { IFav } from '../../core/interfaces/ifav';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [NgStyle,NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss'
})
export class DetailsComponent implements OnInit ,OnDestroy{

  private readonly _ProductsService=inject(ProductsService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _WishListService=inject(WishListService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)




  getSepecificProSub?:Subscription
  detailsProduct:IProduct | null=null

  getAllFavouritsSub!:Subscription
  favourites:IFav[]=[]

  getCarteAddsub!:Subscription


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        // console.log(p);
        
        let idProduct = p.get('id');
        this.getSepecificProSub= this._ProductsService.getSpecificProduct(idProduct!).subscribe({
          next:(res)=>{
            // console.log(res.data);
            this.detailsProduct=res.data            
          },
          
        })
      }
    })

    this.getAllFavouritsSub= this._WishListService.getAllWidhList().subscribe({
      next: (res) => {
        // console.log(res)
        this.favourites=res.data
      },
      
    })
    this.isInWishList(this.detailsProduct!,this.favourites)
  }

ngOnDestroy(): void {
  this.getSepecificProSub?.unsubscribe()
  this.getAllFavouritsSub?.unsubscribe()
  this.getCarteAddsub?.unsubscribe()
}

addCart(id:string):void{
  this._CartService.addProductToCart(id).subscribe({
    next: (res) => {
      // console.log(res);
      this._ToastrService.success(res.message,'FreshCart')
      this._CartService.cartNumber.next(res.numOfCartItems)
      },
  })
}


toggleWishList(product:IProduct):void{
  if(this.isInWishList(product,this.favourites)){
    this._WishListService.removeItemFromWishList(product.id).subscribe({
      next: (res) => {
        // console.log(res);
        this.favourites=res.data
        this.getAllFavouritsSub= this._WishListService.getAllWidhList().subscribe({
          next: (res) => {
            // console.log(res)
            this.favourites=res.data
            // this._ToastrService.success(res.message,'FreshCart')
            this._WishListService.favNum.next(res.count)
          },
          
        })
       
    // this._WishListService.wishListNumber.next(res.numOfWishListItems)
        },
    })
  }else{
        this._WishListService.addToWishList(product.id).subscribe({
              next: (res) => {
                // console.log(res);
                // this._ToastrService.success("Product added successfully to Favourites",'FreshCart')
                this.favourites=res.data
                this.getAllFavouritsSub= this._WishListService.getAllWidhList().subscribe({
                  next: (res) => {
                    // console.log(res)
                    this.favourites=res.data
                    this._WishListService.favNum.next(res.count)
                  },
                  
                })
                
                // this._WishListService.wishListNumber.next(res.numOfWishListItems)
                
              },
            })
  }
 
}

isInWishList(product:IProduct ,wishList:IFav[]) : any{
 return  this._WishListService.isInWishList(product,wishList)
  // this._WishListService.some()
}

generateGradient(rating: number): string {

  return `linear-gradient(90deg,  #ffc908 ${rating}%, transparent ${rating}%)`
}
}
