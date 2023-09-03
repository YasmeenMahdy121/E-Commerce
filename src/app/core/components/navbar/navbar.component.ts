import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductsManagementService } from 'src/app/services/products-management.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  user:any = {}
  cartLength:number = 0
  searchTerm: string = ''
  constructor(private authService:AuthService, private pmService:ProductsManagementService, private router:Router){}
  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe(user=>{
      if(user){
        this.user = user
      }
      else{
        this.user = {}
      }
    })
    this.getCartLength()
  }

  getCartLength(){
    this.pmService.cartProducts.subscribe((products:any)=>{
      this.cartLength = 0
      for (const key of Object.keys(products.cartProducts ?? {})) {
        this.cartLength += products.cartProducts[key].count
      }
    })
  }

  searchProducts(){
    if(this.searchTerm.trim()!==''){
      this.pmService.searchProducts(this.searchTerm)
    }
    else{
      this.pmService.getAllProducts()
    }
    this.pmService.searchedTerm.next(this.searchTerm.trim()!=='')
    this.router.navigate(['/store/product-list'])
  }

  logOut(){
    this.authService.logOut()
  }

}
