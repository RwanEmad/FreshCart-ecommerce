import { Product, Data } from './../../core/interfaces/icart';
import { FilterProByCatPipe } from './../../core/pipes/filter-pro-by-cat.pipe';
import { HttpErrorResponse } from '@angular/common/http';
import { ProductsService } from './../../core/services/products.service';
import { Component, inject, OnDestroy, OnInit, RendererFactory2 } from '@angular/core';
import { IProduct } from '../../core/interfaces/iproduct';
import { CurrencyPipe, NgStyle, UpperCasePipe, NgClass } from '@angular/common';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ICategory } from '../../core/interfaces/icategory';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerComponent, NgxSpinnerService } from 'ngx-spinner';
import { WishListService } from '../../core/services/wish-list.service';
import { IFav } from '../../core/interfaces/ifav';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgStyle,NgClass,FormsModule,CarouselModule,RouterLink,UpperCasePipe,CurrencyPipe,SalePipe,TermTextPipe,SearchPipe,FilterProByCatPipe,NgxSpinnerComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit,OnDestroy {


  private readonly _ProductsService=inject(ProductsService)
  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _CartService=inject(CartService)
  private readonly _ToastrService=inject(ToastrService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)
  private readonly _WishListService=inject(WishListService)


  productsList:IProduct[]=[]
  categoriesList:ICategory[]=[]
  getAllProductsub!:Subscription
  getAllCategorysub!:Subscription
  getAllFavouritsSub!:Subscription
  favourites:IFav[]=[]


  text:string=""
  
  

  customOptionsMain: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,//when hover --> slider stop 
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false
  }



  customOptionsCat: OwlOptions = {
    rtl:true,
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    autoplay:true,
    autoplayTimeout:2000,
    autoplayHoverPause:true,//when hover --> slider stop 
    dots: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 6
      }
    },
    nav: false
  }



  ngOnInit(): void {
    this._NgxSpinnerService.show()
    this.getAllProductsub= this._ProductsService.getAllProducts().subscribe({
      next: (res) => {
        // console.log(res)
        this.productsList=res.data
        this._NgxSpinnerService.hide()

      },
    }) 
    this.getAllCategorysub= this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        // console.log(res)
        this.categoriesList=res.data
      },
    })
    this.getAllFavouritsSub= this._WishListService.getAllWidhList().subscribe({
      next: (res) => {
        // console.log(res)
        this.favourites=res.data
      },
      
    })


  }
 
  ngOnDestroy(): void {
    //unsubscribe
    this.getAllProductsub?.unsubscribe()
    this.getAllCategorysub?.unsubscribe()
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
