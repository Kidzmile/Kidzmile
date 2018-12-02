import { Component, OnInit , Input} from '@angular/core';

@Component({
  selector: 'app-product-ratings',
  templateUrl: './product-ratings.component.html',
  styleUrls: ['./product-ratings.component.scss']
})
export class ProductRatingsComponent implements OnInit {
 @Input() totalRating ;
 @Input() reviewPercent;
 @Input() reviews_count;
 @Input() content: any = [];
 reviewList = 1;


  constructor() { }

  ngOnInit() {
  }

}
