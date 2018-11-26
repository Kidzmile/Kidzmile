import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-sort',
  templateUrl: './product-sort.component.html',
  styleUrls: ['./product-sort.component.scss']
})
export class ProductSortComponent implements OnInit {

  
  selectedOption:string="Relevance";
  isfilterModalShown;
  issortModalShown;
  
  options = [
    { name: 'Newest', value: 1 },
    { name: 'A To Z', value: 2 },
    { name: 'Z To A', value: 3 },
    { name: 'Relevence', value: 4 }
  ]

  queryMap = {
    Newest: 'date',
    'A To Z': 'A-Z',
    'Z To A': 'Z-A',
    Relevance: '',
  }
  constructor(private _routernomal:Router) { }

  ngOnInit() {
  }

  sortModalShow() { this.issortModalShown = true; }
  sortModalhide() { this.issortModalShown = false; }


  sortFilter(i) {
    console.log(i+'called'); 
    const urlTree = this._routernomal.createUrlTree([], {
      queryParams: { 'sort': this.queryMap[i] },
      queryParamsHandling: 'merge',
      preserveFragment: true,
    });
    this._routernomal.navigateByUrl(urlTree);
    this.selectedOption = i;
  }
}
