import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsFilterationPipe } from './pipes/products-filteration.pipe';
import { SearchProductsPipe } from './pipes/search-products.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ProductsFilterationPipe,
    SearchProductsPipe
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    ProductsFilterationPipe
  ]
})
export class SharedModule { }
