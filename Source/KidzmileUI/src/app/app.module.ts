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

import { HeaderComponent } from './Core/Header/header.component';
import { FooterComponent } from './Core/Footer/footer.component';
import { LoginComponent } from './Core/Login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './Core/signup/signup.component';
import { HomeComponent } from './Home/home.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartUpdateService } from './Shared/cartupdate.service';
import { ToasterService } from './Core/Service/Toaster/toaster';
import { AuthGuard } from './Core/Gaurds/auth.guard';

import { AppHttpInterceptor } from './Core/Interceptors/http.interceptor';
import { HomeService } from './Shared/home.service';
import { HomebannercarouselComponent } from './Home/homebannercarousel/homebannercarousel.component';
import { EmptycartcomponentComponent } from './Cart/emptycartcomponent/emptycartcomponent.component';
import { SharedModule } from './Shared/index';
import { AuthenticationService } from './Core/Authentication/authentication.service';
import { JwtInterceptor } from './Core/Interceptors/jwt.interceptor';
import { ErrorInterceptor } from './Core/Interceptors/error.interceptor';



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
  providers: [
    {
      provide: ROUND_PROGRESS_DEFAULTS,
      useValue: {
        color: '#ffa728',
        background: '#ffa728'
      }
    },
    DatePipe,
    CartUpdateService, AuthGuard,
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptor, multi: true },
    HomeService, NguCarousel, AuthenticationService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
