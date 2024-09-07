import { Component, inject, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';
import { IOrder } from '../../core/interfaces/iorder';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [RouterLink,CurrencyPipe,DatePipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{

   
  private readonly _OrdersService=inject(OrdersService)
  private readonly _AuthService=inject(AuthService)
  private readonly _NgxSpinnerService=inject(NgxSpinnerService)

  ordersList:IOrder[]=[]
  getAllOrderSub!:Subscription



  ngOnInit(): void {
    this._NgxSpinnerService.show()

    this.getAllOrderSub=this._OrdersService.getAllOrders().subscribe({
      next: (res) => {
        // console.log(res)
        this.ordersList=res
        this._NgxSpinnerService.hide()

      },
    })

  }

ngOnDestroy(): void {
  this.getAllOrderSub.unsubscribe();
}
 


}
