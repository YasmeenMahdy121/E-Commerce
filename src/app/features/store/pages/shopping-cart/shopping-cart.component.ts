import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from 'src/app/services/products-management.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit{

  cartProducts: any = {}
  totalPrice: number = 0
  constructor(private pmService:ProductsManagementService){}

  ngOnInit(): void {
    this.pmService.getUserCart()
    this.pmService.cartProducts.subscribe(cart=>{
      this.cartProducts = cart.cartProducts
      this.totalPrice = 0
      for (const key of Object.keys(this.cartProducts ?? {})) {
        if(!isNaN(this.cartProducts[key]?.count * this.cartProducts[key]?.price)){
          this.totalPrice += this.cartProducts[key]?.count * this.cartProducts[key]?.price
        }
      }
    })
  }
}
