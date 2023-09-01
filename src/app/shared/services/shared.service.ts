import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  errorMessage = new BehaviorSubject<any>({})
  constructor() { }
}
