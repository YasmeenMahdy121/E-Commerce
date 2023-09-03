import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { IProduct } from '../features/store/interfaces/IProduct';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { IUser } from '../features/auth/interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class ProductsManagementService {
  baseURL = 'http://[::1]:3000/'
  productsList = new BehaviorSubject<IProduct[]|[]>([])
  cartProducts = new BehaviorSubject<any>({})
  searchedTerm = new Subject()
  constructor(private http:HttpClient, private authService:AuthService, private router: Router) { }

  getAllProducts(){
    this.http.get(`${this.baseURL}products`).subscribe((products:any)=>{
      this.productsList.next(products)
    })
  }

  searchProducts(title: string){
    this.http.get(`${this.baseURL}products?title_like=${title}`).subscribe((products:any)=>{
      this.productsList.next(products)
    })
  }
  productsFilteration(category:string){
    this.http.get(`${this.baseURL}products?category=${category}`).subscribe((products:any)=>{
      this.productsList.next(products)
    })
  }
  getUserCart(){
    if(this.authService.isLoggedIn.getValue().email){
      this.http.get(`${this.baseURL}carts?userEmail=${this.authService.isLoggedIn.getValue().email}`).subscribe((userCart:any)=>{
        this.cartProducts.next(userCart[0])
      })
    }
    else{
      this.cartProducts.next({})
    }
  }

  addToCart(product:IProduct){
    if(this.authService.isLoggedIn.getValue().email){
      if(this.cartProducts.getValue().cartProducts[product.id+'']){
        this.cartProducts.getValue().cartProducts[product.id+''].count++
      }
      else{
        this.cartProducts.getValue().cartProducts[product.id+''] = {...product, count:1}
      }
      this.cartProducts.next({...this.cartProducts.getValue()})
      this.http.patch(`${this.baseURL}carts/${this.cartProducts.getValue().id}`,{cartProducts:this.cartProducts.getValue().cartProducts}).subscribe(d=>{
      })
    }
    else{
      this.router.navigate(['/auth/login'])
    }
  }

  increaseProduct(product:IProduct){
    this.cartProducts.getValue().cartProducts[product.id+''].count++
    this.cartProducts.next({...this.cartProducts.getValue()})
    this.updateCartProducts()
  }

  decreaseProduct(product:IProduct){
    this.cartProducts.getValue().cartProducts[product.id+''].count--
    this.cartProducts.next({...this.cartProducts.getValue()})
    this.updateCartProducts()
  }

  removeProduct(product:IProduct){
    delete this.cartProducts.getValue().cartProducts[product.id+'']
    this.cartProducts.next({...this.cartProducts.getValue()})
    this.updateCartProducts()
  }

  updateCartProducts(){
    this.http.patch(`${this.baseURL}carts/${this.cartProducts.getValue().id}`,
    {cartProducts:this.cartProducts.getValue().cartProducts}).subscribe(d=>{})
  }
}
