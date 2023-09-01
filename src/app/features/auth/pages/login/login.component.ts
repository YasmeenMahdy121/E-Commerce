import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!:FormGroup
  constructor(private fb: FormBuilder, private authService:AuthService){
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ["",[Validators.required,Validators.pattern(/([0-9]|[a-zA-Z]){8,}/)]]
    });
  }
  
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  login(){
    if(this.loginForm.valid){
      this.authService.login(this.loginForm)
    }
  }

}
