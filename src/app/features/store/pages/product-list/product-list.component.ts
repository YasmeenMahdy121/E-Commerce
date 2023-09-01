import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from 'src/app/services/products-management.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  selectedCategory: {name: string, code: string } = { name: 'All', code: 'all' }
  categories!: {name: string, code: string }[]
  productsList: IProduct[] | [] = []
  constructor(private pmService:ProductsManagementService){
    this.categories = [
      { name: 'All', code: 'all' },
      { name: `Women's Clothing`, code: `women's clothing` },
      { name: `Men's Clothing`, code: `men's clothing` },
      { name: 'Jewelery', code: 'jewelery' },
      { name: 'Electronics', code: 'electronics' },
    ]
  }

  ngOnInit(): void {
    this.pmService.getAllProducts()
    this.pmService.productsList.subscribe(products=>{
      this.productsList = products
    })
    this.pmService.getUserCart()
  }

}
