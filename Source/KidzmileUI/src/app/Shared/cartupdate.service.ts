import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartUpdateService {

  public itemsInCart: Number;

  constructor() {
    this.itemsInCart = JSON.parse(localStorage.getItem("cartContent"));
  }

  addData (data) {
    this.itemsInCart = this.itemsInCart +  data;
    localStorage.setItem("cartContent", JSON.stringify(this.itemsInCart));
  }
  getData () {
    return this.itemsInCart;
  }
}
