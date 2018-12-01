import { Component, OnInit } from '@angular/core';
import { CartUpdateService } from '../Shared/cartupdate.service';

@Component({
  selector: 'app-cart-main',
  templateUrl: './cart-main.component.html',
  styleUrls: ['./cart-main.component.scss']
})
export class CartMainComponent implements OnInit {

  isEmpty: boolean = true;
  constructor(private _cartService: CartUpdateService) { }

  ngOnInit() {
    this._cartService.getData() ? (this.isEmpty = false) : (this.isEmpty = true);
  }

}
