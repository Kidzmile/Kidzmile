import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../Core/Service/Toaster/toaster';
import { Product } from '../../Model/ProductModel/product.model';
import { CartUpdateService } from '../../Shared/cartupdate.service';
import { ProductService } from 'src/app/Service/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {

  sku_code = 'TDB';
  product: Product = {
    sku_code: 'TDDY',
    name: 'Teddy,Pink',
    average_rating: 4,
    product_active: true,
    price_per_unit: 5000
  };

  discount = 1500;
  discountedPrice = this.product.price_per_unit - this.discount;

  countItems: any = 1;
  updateCountItems: any = 0;
  maxrating = 5;


  constructor(private _cartService: CartUpdateService, private toaster: ToasterService, private _productservice: ProductService) { }


  sideBarImageSrc: String[] = [];
  imagePath: any;


  ratingOne = 0;
  ratingTwo = 0;
  ratingThree = 50;
  ratingFour = 50;
  ratingFive = 0;

  reviewData = [{
    rating: 4,
    title: 'g',
    review: 'This is on hellva Prodectu',
    name: 'Kek',
    created_at: '2017-10-2'

  }, {
    rating: 3,
    title: 'H',
    review: 'This is one hel Prodect',
    name: 'lol',
    created_at: '2016-10-2'

  }];


  updateItemsCount: Number = 0;





  reviews_count = this.reviewData.length;
  reviewPercent = ((this.reviewData[0].rating + this.reviewData[1].rating) * 100 / (this.reviews_count * this.maxrating));
  totalRating = (this.reviewData[0].rating + this.reviewData[1].rating) / this.reviews_count;



  ngOnInit() {
    this._productservice.getImagesBySkuCode(this.sku_code).subscribe((imageUrls) => {
      this.sideBarImageSrc = imageUrls;
      console.log(imageUrls);
    });
    
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

  addToCartEvent() {
    this._cartService.addData(this.countItems);
    this.toaster.success('cart successfully updated');

  }

}
