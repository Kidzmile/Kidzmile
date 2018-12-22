import { Router } from '@angular/router';
import {
  Component,
  OnInit,
  OnChanges,
  SimpleChanges
} from "@angular/core";
import { ProductService } from "src/app/Service/product.service";

@Component({
  selector: "app-product-list",
  templateUrl: "./product-list.component.html",
  styleUrls: ["./product-list.component.scss"]
})
export class ProductListComponent implements OnInit, OnChanges {
  products: Product[];
  allProducts: Product[];
  selectedValues: Object;
  sortFilter = 'Name';

  constructor(private _productservice: ProductService, private _router: Router) { }

  ngOnInit() {
    this._productservice.getAllProducts().subscribe(data => {
      this.products = this.allProducts = data;
      this.sortChanged('1');
    },
      (err) => {
        console.log(err);
      });
  }

  ngOnChanges(changes: SimpleChanges): void { }

  categoriesChanged(categories: string[]) {
    const productCategories = categories;
    if (categories.length > 0) {
      this.products = this.allProducts.filter(function (
        element: Product) {
        if (productCategories.indexOf(element['Category']) !== -1) {
          return true;
        } else {
          return false;
        }
      });
    } else {
      this.products = this.allProducts;
    }
  }

  sortChanged(filter: string) {
    let sortProperty = '';
    switch (filter) {
      case '1':
        sortProperty = 'Name';
        break;
      case '2':
        sortProperty = 'PricePerUnit';
        break;
      case '3':
        sortProperty = 'Category';
        break;
      default:
        sortProperty = 'Name';
        break;
    }
    this.sortFilter = sortProperty;
    this.products.sort((a: Product, b: Product) => {
      if (a[this.sortFilter] > b[this.sortFilter]) {
        return 1;
      } else if (a[this.sortFilter] < b[this.sortFilter]) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  productClicked(product: Product) {
    this._router.navigate(['/product', product.SKUCode]);
  }
}
