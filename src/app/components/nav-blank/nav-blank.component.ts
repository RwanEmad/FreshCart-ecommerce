import { WishListService } from './../../core/services/wish-list.service';

import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslayteService } from '../../core/services/my-translayte.service';
import { CartService } from '../../core/services/cart.service';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink,RouterLinkActive,TranslateModule,],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.scss'
})
export class NavBlankComponent implements OnInit{
  

  readonly _AuthService= inject(AuthService)
  readonly _CartService= inject(CartService)
  private readonly  _MyTranslayteService= inject(MyTranslayteService)
  private readonly  _WishListService= inject(WishListService)
    readonly _TranslateService=inject(TranslateService);
  getAllFavouritsSub!:Subscription

    countNum:number=0
    favsNum:number=0
  // logOut():void{
  //   this._AuthService.logOut()
  // }


ngOnInit(): void {


  this._CartService.getProductsCart().subscribe({
    next: (res) => {
      this._CartService.cartNumber.next(res.numOfCartItems)
      this.countNum = res.numOfCartItems
      },
  })


  this._CartService.cartNumber.subscribe({
    next: (count) => {
      this.countNum = count;
      }
  })
  this.getAllFavouritsSub= this._WishListService.getAllWidhList().subscribe({
    next: (res) => {
      // console.log(res.count)
      this._WishListService.favNum.next(res.count)
      this.favsNum = res.count
    
    },
    
  })
  this._WishListService.favNum.subscribe({
    next: (count) => {
      this.favsNum = count;
      }
  })
}


  change(lang:string):void{
    this._MyTranslayteService.changeLang(lang)
  }


}
