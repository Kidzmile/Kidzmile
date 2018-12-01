import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSortComponent implements OnInit {

  selectedOption:string="Name";
  defaultselectedEntry = 'Name';
    
  options = [
    { name: 'Name', value: 1 },
    { name: 'Price', value: 2 },
    { name: 'Rating', value: 3 }
  ]

  constructor(private _routernomal:Router) { }

  ngOnInit() {
  }



}
