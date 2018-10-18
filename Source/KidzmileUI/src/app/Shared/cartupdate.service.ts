import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {

  public itemsInCart: Number;

  constructor() {
    this.itemsInCart = 0;
  }

  addData (data) {
    this.itemsInCart = this.itemsInCart +  data;
  }
  getData () {
    return this.itemsInCart;
  }
}
