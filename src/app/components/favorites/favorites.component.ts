import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductsService } from '../../core/services/products.service';
import { CategoriesService } from '../../core/services/categories.service';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wish-list.service';
import { IProduct } from '../../core/interfaces/iproduct';
import { ICategory } from '../../core/interfaces/icategory';
import { Subscription } from 'rxjs';
import { IFav } from '../../core/interfaces/ifav';
import { CurrencyPipe, NgClass, NgStyle, UpperCasePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [NgStyle,NgClass,FormsModule,RouterLink,UpperCasePipe,CurrencyPipe,SearchPipe,TermTextPipe,NgxSpinnerComponent],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent implements OnInit,OnDestroy{


  private readonly _ToastrService=inject(ToastrService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  private readonly _WishListService=inject(WishListService)
  private readonly _CartService=inject(CartService)


  getAllFavouritsSub!:Subscription
  favourites:IProduct[]=[]


  
  ngOnInit(): void {
    this._NgxSpinnerService.show()
   
    this.getAllFavouritsSub= this._WishListService.getAllWidhList().subscribe({
      next: (res) => {
        // console.log(res)
        this.favourites=res.data
      },
      
    })


  }
 
  ngOnDestroy(): void {
    //unsubscribe
    this.getAllFavouritsSub?.unsubscribe()

  }


  generateGradient(rating: number): string {
    return `linear-gradient(90deg,  #ffc908 ${rating}%, transparent ${rating}%)`
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



}
