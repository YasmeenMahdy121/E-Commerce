import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsManagementService } from 'src/app/services/products-management.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent {
  @Input() productData!: IProduct
  constructor(private pmService:ProductsManagementService){}

  addToCart(){
    this.pmService.addToCart(this.productData)
  }
}
