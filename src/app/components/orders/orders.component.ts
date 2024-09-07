import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent  implements OnInit,OnDestroy{


  private readonly _FormBuilder=inject(FormBuilder)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  private readonly _OrdersService=inject(OrdersService)


  getOrdersSub?:Subscription
  cartId:string | null=null


  orders:FormGroup= this._FormBuilder.group({

        details:[null,[Validators.required]],
        phone:[null,[Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)]],
        city:[null,[Validators.required]] 

  })

ngOnInit(): void {
  
  this._ActivatedRoute.paramMap.subscribe({
    next: (params) => {
      this.cartId=params.get('id')
      console.log(params.get('id'))
    },
    error: (error) => console.error('error:', error)
  })


  

}

  orderSubmit():void{

   this.getOrdersSub= this._OrdersService.checkOut(this.cartId!,this.orders.value).subscribe({
      next(res) {
        if(res.status=="success"){
          
          window.open(res.session.url,'_self')
            console.log(res);
        }
      
        
      },
      error(err) {
        console.error('error:', err)
        }
    })
    console.log(this.orders.value);
    
  }
ngOnDestroy(): void {
  this.getOrdersSub?.unsubscribe()
}

check():void{
  console.log("ITS OK");
}


}
