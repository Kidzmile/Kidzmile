import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";

@Component({
  selector: "app-product-sort",
  templateUrl: "./product-sort.component.html",
  styleUrls: ["./product-sort.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProductSortComponent implements OnInit {
  selectedOption: Number = 1;

  @Output() sortDropDownChanged = new EventEmitter();

  options = [
    { name: 'Name' , value: 1 },
    { name: 'Price', value: 2 },
    { name: 'Rating', value: 3 }
  ];

  constructor() {}

  ngOnInit() {
    console.log(this.selectedOption);
  }

  sortFilter(filter: Number) {
    this.selectedOption = filter;
    this.sortDropDownChanged.emit(this.selectedOption);
  }
}
