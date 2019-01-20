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

  OnLoading(){
    console.log('called');
  }

  calculateDiscountPercentage(product:Product):number{
   /* let differencePercentage=0;
    if (product.Discount<=0){
      return differencePercentage;
    }
    const difference=product.PricePerUnit-product.Discount;
     differencePercentage=(difference/product.PricePerUnit)*100;
    return differencePercentage>0?differencePercentage:0;*/

    let difference=0;
    if (product.Discount<=0){
      return difference;
    }
    return product.PricePerUnit-product.Discount;

  }
}
