import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/interfaces/ibrand';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './brands.component.html',
  styleUrl: './brands.component.scss'
})
export class BrandsComponent implements OnInit ,OnDestroy{

  private readonly _BrandsService=inject(BrandsService)

  brandsList:IBrand[]=[]
  getAllBrandsub!:Subscription



  ngOnInit(): void {

    this.getAllBrandsub=this._BrandsService.getAllBrands().subscribe({
      next: (res) => {
        console.log(res.data)
        this.brandsList=res.data
      },
    })
  }

ngOnDestroy(): void {
  this.getAllBrandsub.unsubscribe();
}
  
}
