import { Injectable } from '@angular/core';
import { Login } from '../Core/Model/Login/login.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {
sharedData:any;
public isUserAuthenticated: BehaviorSubject<any> = new BehaviorSubject<any>(false);
  constructor() {
    console.log(this.sharedData);
   }
}
