import { Component } from '@angular/core';
import { SharedService } from './shared/services/shared.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'E-Commerce';
  errorMessage:any = {}
  constructor(private sharedService:SharedService){
    this.sharedService.errorMessage.subscribe(message=>{
      this.errorMessage = message
    })
  }

  resetErrorMessage(){
    this.sharedService.errorMessage.next({})
  }
}
