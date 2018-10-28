import { Component, OnInit, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NguCarousel, NguCarouselStore } from '@ngu/carousel';


@Component({
  selector: 'app-homebannercarousel',
  templateUrl: './homebannercarousel.component.html',
  styleUrls: ['./homebannercarousel.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomebannercarouselComponent implements OnInit {

  //public bannerItems = environment.config.landing_page_banner;

  public bannerItems = [{link_url: '', image_link:'https://rukminim1.flixcart.com/image/832/832/j16qm4w0/stuffed-toy/e/4/v/3-feet-soft-teddy-bear-for-birthday-party-cream-color-91-avs-original-imaessxnuuxapjd8.jpeg?q=70' },
                        {link_url: '',image_link : 'https://cdn.shopify.com/s/files/1/1920/7987/products/Bear_in_Robe_1000x1000.jpg?v=1509394168' }, 
                        {link_url: '', image_link: 'https://images-na.ssl-images-amazon.com/images/I/41nGGVyAxJL._SX425_.jpg'}];
  public carouselOne: NguCarousel;
  @ViewChild('landingBanners') landingBanners: NguCarouselStore;

  constructor() {}

  ngOnInit() {
    this.carouselOne = {
      grid: { xs: 1, sm: 1, md: 1, lg: 1, all: 0 },
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: false,
        pointStyles: '.ngucarouselPoint {}' // To apply our modification
      },
      load: 2,
      touch: true,
      loop: true,
      custom: 'banner'
    };
  }

  onMoveBanner(store: NguCarouselStore) {
    this.landingBanners.currentSlide = store.currentSlide;
  }


}
