import { Component, OnInit } from '@angular/core';
import { ProductsManagementService } from 'src/app/services/products-management.service';
import { IProduct } from '../../interfaces/IProduct';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit{
  productsList: IProduct[] | [] = []
  // filter
  selectedCategory: {category: string, code: string } = { category: 'All', code: '' }
  categories!: {category: string, code: string }[]
  // pagination
  first: number = 0;
  rows: number = 8;
  constructor(private pmService:ProductsManagementService){
    this.categories = [
      { category: 'All', code: '' },
      { category: `Women's Clothing`, code: `women's clothing` },
      { category: `Men's Clothing`, code: `men's clothing` },
      { category: 'Jewelery', code: 'jewelery' },
      { category: 'Electronics', code: 'electronics' },
    ]
  }

  ngOnInit(): void {
    this.pmService.getAllProducts()
    this.pmService.productsList.subscribe(products=>{
      this.productsList = products
    })
    this.pmService.getUserCart()
    this.resetPaginationWhenSearch()
  }

  productsFilteration(){
    if(this.selectedCategory.code!==''){
      this.pmService.productsFilteration(this.selectedCategory.code)
    }
    else{
      this.pmService.getAllProducts()
    }
    // reset pagination
    this.first = 0;
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
  }
  resetPaginationWhenSearch(){
    this.pmService.searchedTerm.subscribe(term=>{
    // reset pagination
    this.first = 0;
    })
  }

}
