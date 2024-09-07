import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CategoriesService } from '../../core/services/categories.service';
import { CurrencyPipe, NgStyle, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { ICategory } from '../../core/interfaces/icategory';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { TermTextPipe } from '../../core/pipes/term-text.pipe';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [FormsModule,RouterLink,SearchPipe,TermTextPipe,UpperCasePipe,CurrencyPipe,NgStyle],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit ,OnDestroy{
  
  private readonly _CategoriesService=inject(CategoriesService)

  categoriesList:ICategory[]=[]
  getAllCategorysub!:Subscription



  ngOnInit(): void {

    this.getAllCategorysub=this._CategoriesService.getAllCategories().subscribe({
      next: (res) => {
        console.log(res)
        this.categoriesList=res.data
      },
    })

  }

ngOnDestroy(): void {
  this.getAllCategorysub.unsubscribe();
}
  







}
