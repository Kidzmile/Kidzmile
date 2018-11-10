import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { RoundProgressModule, ROUND_PROGRESS_DEFAULTS_PROVIDER, ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';
import { FormsModule } from '@angular/forms';
import { ImageZoomModule } from 'angular2-image-zoom';
import { DatePipe, CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NguCarouselModule, NguCarousel } from '@ngu/carousel';


import { AppComponent } from './app.component';

import { HeaderComponent } from './core/Header/header.component';
import { FooterComponent } from './core/Footer/footer.component';
import { LoginComponent } from './Core/Login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './Core/signup/signup.component';
import { HomeComponent } from './Home/home.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartUpdateService } from './Shared/cartupdate.service';
import { AuthGuard } from './Auth/auth.guard';

import { HttpInterceptorService } from './Core/Interceptors/http-interceptor.service';
import { HomeService } from './Shared/home.service';
import { HomebannercarouselComponent } from './Home/homebannercarousel/homebannercarousel.component';
import { EmptycartcomponentComponent} from './Cart/emptycartcomponent/emptycartcomponent.component';
import { SharedModule } from './Shared/index';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductDetailsComponent,
    HomebannercarouselComponent,
    EmptycartcomponentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxInputStarRatingModule,
    RoundProgressModule,
    ImageZoomModule,
    CommonModule,
    NguCarouselModule,
    SharedModule

  ],
  providers: [{
    provide: ROUND_PROGRESS_DEFAULTS,
    useValue: {
      color: '#ffa728',
      background: '#ffa728'
    }
  }, DatePipe,
    CartUpdateService, AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: HttpInterceptorService, multi: true },
  HomeService, NguCarousel],
  bootstrap: [AppComponent]
})
export class AppModule { }
