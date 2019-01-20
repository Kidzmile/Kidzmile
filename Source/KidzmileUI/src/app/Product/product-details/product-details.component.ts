import { ActivatedRoute, Route,Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { ToasterService } from "../../Core/Service/Toaster/toaster";
import { Product } from "../../Model/ProductModel/product.model";
import { CartUpdateService } from "../../Shared/cartupdate.service";
import { ProductService } from "../../Service/product.service";

@Component({
  selector: "app-product-details",
  templateUrl: "./product-details.component.html",
  styleUrls: ["./product-details.component.scss"]
})
export class ProductDetailsComponent implements OnInit {
  sku_code = "";
  product: Product ;
  discount = 0;
  //discountedPrice = this.product.pricePerUnit - this.discount;
  discountedPrice:Number;
  countItems: any = 1;
  updateCountItems: any = 0;
  maxrating = 5;

  constructor(
    private _cartService: CartUpdateService,
    private _productservice: ProductService,
    private _route: ActivatedRoute,
    private toaster: ToasterService
  ) {
    this.product=this._route.snapshot.data["productdetail"];
    this.sku_code=this.product.SKUCode;
  }

  sideBarImageSrc: String[] = [];
  imagePath: any;

  ratingOne = 0;
  ratingTwo = 0;
  ratingThree = 50;
  ratingFour = 50;
  ratingFive = 0;

  reviewData = [
    {
      rating: 4,
      title: "g",
      review: "This is on hellva Prodectu",
      name: "Kek",
      created_at: "2017-10-2"
    },
    {
      rating: 3,
      title: "H",
      review: "This is one hel Prodect",
      name: "lol",
      created_at: "2016-10-2"
    }
  ];

  updateItemsCount: Number = 0;

  reviews_count = this.reviewData.length;
  reviewPercent = ((this.reviewData[0].rating + this.reviewData[1].rating) * 100 / (this.reviews_count * this.maxrating));
  totalRating =
    (this.reviewData[0].rating + this.reviewData[1].rating) /
    this.reviews_count;

  ngOnInit() {
    this._productservice
      .getImagesBySkuCode(this.sku_code)
      .subscribe(imageUrls => {
        this.sideBarImageSrc = imageUrls; // Subscribing to the product service for retrieving image using SKUcode
        console.log(imageUrls);
      });


      this._productservice.getProductBySkucode(this.sku_code).subscribe((data)=>{
        let pricepu=data["PricePerUnit"];
        let discountedPrice=data["Discount"];
        this.discount= pricepu-discountedPrice;
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
    this.toaster.success("cart successfully updated");
  }

}
