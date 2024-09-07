import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../interfaces/iproduct';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:any[],term:string ): any[] {

    return products.filter((item)=>{
      return item.title!.toLowerCase().includes(term!.toLowerCase())
    });
  }

}
