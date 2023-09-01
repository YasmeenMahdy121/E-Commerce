import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from 'src/app/features/store/interfaces/IProduct';

@Pipe({
  name: 'productsFilteration'
})
export class ProductsFilterationPipe implements PipeTransform {

  transform(productsList: IProduct[] | [], category: string): IProduct[] | [] {
    if(category==='all')
      return productsList
    return productsList.filter(product=> product.category === category);
  }

}
