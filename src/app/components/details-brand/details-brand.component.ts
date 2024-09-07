import { Component, inject } from '@angular/core';
import { BrandsService } from '../../core/services/brands.service';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { IBrand } from '../../core/interfaces/ibrand';

@Component({
  selector: 'app-details-brand',
  standalone: true,
  imports: [],
  templateUrl: './details-brand.component.html',
  styleUrl: './details-brand.component.scss'
})
export class DetailsBrandComponent {

  private readonly _BrandsService=inject(BrandsService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  
  getSepecificBrandSub?:Subscription
  detailsBrand:IBrand | null=null


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p);
        
        let idCat = p.get('id');
        this.getSepecificBrandSub= this._BrandsService.getSpecificBrand(idCat!).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsBrand=res.data            
          }
        })
      }
    })
  }

ngOnDestroy(): void {
  this.getSepecificBrandSub?.unsubscribe()
}

}
