import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {
  @Input() product: Product;
  appConfig = environment.config;
  currency = environment.config.currency_symbol;
  noImageUrl = 'assets/default/no-image-available.jpg';

  constructor(private _sanitizer:DomSanitizer) { }

  ngOnInit() {
  }
  getProductImageUrl(product: Product) {
    return this._sanitizer.bypassSecurityTrustUrl(product.ImagePath);
  // return "";
  }
}
