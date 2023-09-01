import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsManagementService } from 'src/app/services/products-management.service';
import { SharedService } from 'src/app/shared/services/shared.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit{

  checkoutForm!:FormGroup
  cartProducts: any = {}
  totalPrice: number = 0

  constructor(private fb: FormBuilder, private router: Router, private pmService:ProductsManagementService, private sharedService:SharedService){
    this.checkoutForm = this.fb.group({
      cardNumber: ["", [Validators.required, Validators.pattern(/^[0-9]{16}$/)]],
      expireDate : ["",[Validators.required]],
      cardCode : ["",[Validators.required, Validators.pattern(/^[0-9]{3}$/)]],
    });
  }
  
  get cardNumber() {
    return this.checkoutForm.get('cardNumber');
  }
  get expireDate () {
    return this.checkoutForm.get('expireDate');
  }
  get cardCode () {
    return this.checkoutForm.get('cardCode');
  }

  ngOnInit(): void {
    this.getCartData()
  }

  getCartData(){
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

  checkout(){
    if(this.checkoutForm.valid && this.totalPrice){
      this.checkoutForm.reset()
      this.router.navigate(['/store/success'])
    }
    else if(!this.totalPrice){
      this.sharedService.errorMessage.next({errorCode: 'Cart is Empty', message: 'Please select desired products to checkout!!', show: true})
    }
  }
}
