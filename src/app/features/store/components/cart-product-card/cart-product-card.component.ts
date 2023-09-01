import { Component, Input } from '@angular/core';
import { IProduct } from '../../interfaces/IProduct';
import { ProductsManagementService } from 'src/app/services/products-management.service';

@Component({
  selector: 'app-cart-product-card',
  templateUrl: './cart-product-card.component.html',
  styleUrls: ['./cart-product-card.component.scss']
})
export class CartProductCardComponent {
  @Input() productData!: any
  constructor(private pmService:ProductsManagementService){}


  increaseProduct(){
    this.pmService.increaseProduct(this.productData)
  }
  decreaseProduct(){
    this.pmService.decreaseProduct(this.productData)
  }
  removeProduct(){
    this.pmService.removeProduct(this.productData)
  }
}
