import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterProByCat',
  standalone: true
})
export class FilterProByCatPipe implements PipeTransform {

  transform(products:any[],catId:string ): any[] {

    return products.filter((product)=>{
      return product.category._id ==catId
    });
  }

}
