import { Component, OnInit, Output , EventEmitter} from '@angular/core';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  i  = 0;
  countItems: any = 1;
  updateCountItems: any = 0;
  maxrating = 5;
  reviewList = 1;
  imagePath: String = 'https://images-na.ssl-images-amazon.com/images/I/91OvPETRBkL._SY450_.jpg' ;
  sideBarImageSrc: String[] = [ 'https://images-na.ssl-images-amazon.com/images/I/91OvPETRBkL._SY450_.jpg',
                                          'https://images-na.ssl-images-amazon.com/images/I/51ohFQJI91L.jpg'];

ratingOne = 0;
ratingTwo = 0;
ratingThree = 50;
ratingFour = 50;
ratingFive = 0;

updateItemsCount: Number = 0;
@Output() updateItemsCountEvent = new EventEmitter<Number>();



constructor() {}

  content = [ {
    rating: 4,
    title: 'g',
    review: 'This is on hellva Prodectu',
    name : 'Kek',
    created_at : '2017-10-2'

  }, {
    rating: 3,
    title: 'H',
    review: 'This is one hel Prodect',
    name : 'lol',
    created_at : '2016-10-2'

  }];

  reviews_count = this.content.length;
  reviewPercent = ((this.content[0].rating + this.content[1].rating) * 100 / (this.reviews_count * this.maxrating));
  totalRating = (this.content[0].rating + this.content[1].rating) / this.reviews_count;


  ngOnInit() {
  }

  /*Incrementing the number of items in cart*/
  incrementItemCount(): void {
     if (this.countItems < 100) {
     this.countItems++;
    }
      return;
  }

/*Decrementing the number of items in cart*/
   decrementItemCount(): void {
      if (this.countItems > 1) {
      this.countItems--;
       }
      return;
   }

   btnClickImageChange(imgSrcPayload: any): void {

    this.imagePath = imgSrcPayload;
 }

 addToCartEvent () {
   this.updateItemsCount = this.updateItemsCount + this.countItems ;
   this.updateItemsCountEvent.emit(this.updateItemsCount);

 }

}
