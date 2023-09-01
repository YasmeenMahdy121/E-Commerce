import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreRoutingModule } from './store-routing.module';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { ShoppingCartComponent } from './pages/shopping-cart/shopping-cart.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ProductCardComponent } from './components/product-card/product-card.component';
import { SuccessComponent } from './pages/success/success.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { CartProductCardComponent } from './components/cart-product-card/cart-product-card.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    ProductListComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    ProductCardComponent,
    SuccessComponent,
    CartProductCardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    StoreRoutingModule,
    DropdownModule,
    SharedModule
  ]
})
export class StoreModule { }
