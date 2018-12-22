import { ActivatedRoute } from '@angular/router';
import { ProductService } from './product.service';
import { Product } from './../Model/ProductModel/product.model';
import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductDetailsResolver implements Resolve<Product>{
  sku_code:"";

  constructor(private _router:ActivatedRoute,private _productService:ProductService) {
   /* this.sku_code = this._router.snapshot.params["skucode"];
    console.log(this._router.snapshot.params["skucode"]);
    console.log(this.sku_code);
    console.log(this._router.snapshot.paramMap.get("skucode"));*/
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    return this._productService.getProductBySkucode(route.params.skucode) ;

  }
}
