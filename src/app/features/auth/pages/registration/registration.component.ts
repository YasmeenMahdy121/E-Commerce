import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  registrationForm!:FormGroup
  constructor(private fb: FormBuilder, private authService:AuthService){
    this.registrationForm = this.fb.group({
      userName: ["", [Validators.required, Validators.pattern(/^[a-zA-Z]{2,} [a-zA-Z]{2,}$/)]],
      email: ["", [Validators.required, Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)]],
      password: ["",[Validators.required,Validators.pattern(/([0-9]|[a-zA-Z]){8,}/)]]
    });
  }
  
  get userName(){
    return this.registrationForm.get('userName');
  }
  get email() {
    return this.registrationForm.get('email');
  }
  get password() {
    return this.registrationForm.get('password');
  }
  register(){
    if(this.registrationForm.valid){
      this.authService.register(this.registrationForm)
    }
  }
}
