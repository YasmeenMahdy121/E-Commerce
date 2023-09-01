import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {catchError} from "rxjs/operators";
import { SharedService } from 'src/app/shared/services/shared.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private sharedService:SharedService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
         let errorMsg = '';
         if (error.error instanceof ErrorEvent) {
            errorMsg = `Error: ${error.error.message}`;
          this.sharedService.errorMessage.next({errorCode: 'client side error', message: errorMsg, show: true})
         } else {
            errorMsg = `Error: ${error.message}`;
            this.sharedService.errorMessage.next({errorCode: error.status, message: errorMsg, show: true})
         }
         return throwError(errorMsg);
      })
)
  }
}
