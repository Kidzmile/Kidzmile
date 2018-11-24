import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/Service/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {
  products:Product;
  constructor( private _productservice:ProductService) { }

  ngOnInit() {
    this._productservice.getAllProducts().subscribe((data)=>{
      this.products=data; 
    });
  }

}
