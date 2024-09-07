import { Component, inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { CategoriesService } from '../../core/services/categories.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { ICategory } from '../../core/interfaces/icategory';

@Component({
  selector: 'app-details-category',
  standalone: true,
  imports: [NgStyle,RouterLink],
  templateUrl: './details-category.component.html',
  styleUrl: './details-category.component.scss'
})
export class DetailsCategoryComponent {

  private readonly _CategoriesService=inject(CategoriesService)
  private readonly _ActivatedRoute=inject(ActivatedRoute)
  
  getSepecificProSub?:Subscription
  detailsCategory:ICategory | null=null


  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        console.log(p);
        
        let idCat = p.get('id');
        this.getSepecificProSub= this._CategoriesService.getSpecificCategory(idCat!).subscribe({
          next:(res)=>{
            console.log(res.data);
            this.detailsCategory=res.data            
          },
          error(err) {
            console.error(err);
          },
        })
      }
    })
  }

ngOnDestroy(): void {
  this.getSepecificProSub?.unsubscribe()
}


generateGradient(rating: number): string {

  return `linear-gradient(90deg,  #ffc908 ${rating}%, transparent ${rating}%)`
}
}
