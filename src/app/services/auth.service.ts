import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../features/auth/interfaces/IUser';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { ProductsManagementService } from './products-management.service';
import { SharedService } from '../shared/services/shared.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseURL = 'http://[::1]:3000/'
  isLoggedIn = new BehaviorSubject<any>({})

  constructor(private http:HttpClient, private router: Router, private sharedService:SharedService) { 
    this.isLoggedIn.next(JSON.parse(localStorage.getItem('user')!)??{})
  }
  // login
  login(loginForm:FormGroup){
    let user:IUser
    this.http.get(`${this.baseURL}users?email=${loginForm.value.email}&&password=${loginForm.value.password}`)
    .subscribe((users:any)=>{
      user = users[0]
      if(user){
        let userDataToSave = {
          userName:user.userName,
          email:user.email
        }
        this.isLoggedIn.next(userDataToSave)
        localStorage.setItem('user',JSON.stringify(userDataToSave))
        loginForm.reset()
        this.router.navigate(['/store/product-list'])
      }
      else{
        this.sharedService.errorMessage.next({errorCode: '404', message: 'User not found, register now!!', show: true})
      }
    })
  }
  // register
  register(registerForm:FormGroup){
    let user:IUser
    this.http.get(`${this.baseURL}users?email=${registerForm.value.email}`)
    .subscribe((users:any)=>{
      user = users[0]
      if(user){
        this.sharedService.errorMessage.next({errorCode: '409 ', message: 'User already registered, login now!!', show: true})
      }
      else{
        user = {
          userName: registerForm.value.userName,
          email: registerForm.value.email,
          password: registerForm.value.password
        }
        this.http.post(`${this.baseURL}users`,user).subscribe((newUser:any)=>{
          this.createUserCart(newUser)
          let userDataToSave = {
            userName:user.userName,
            email:user.email
          }
          this.isLoggedIn.next(userDataToSave)
          localStorage.setItem('user',JSON.stringify(userDataToSave))
          registerForm.reset()
          this.router.navigate(['/store/product-list'])
        })
      }
    })
  }

  createUserCart(user:IUser){
    let newCart = {
      userEmail: user.email,
      cartProducts: {}
    }
    this.http.post(`${this.baseURL}carts`,newCart).subscribe(cart=>{
    })
  }

  // logout
  logOut(){
    this.isLoggedIn.next({})
    localStorage.removeItem('user')
    this.router.navigate(['/auth/login'])
  }
}
