import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedModule } from '../shared/shared.module';
import { NavbarComponent } from './components/navbar/navbar.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AppRoutingModule } from '../app-routing.module';


@NgModule({
  declarations: [
    NavbarComponent,
    PageNotFoundComponent
  ],
  exports:[
    NavbarComponent,
    PageNotFoundComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppRoutingModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: ErrorCatchingInterceptor, multi: true },
  ]
})
export class CoreModule { }
