import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxInputStarRatingModule } from 'ngx-input-star-rating';
import { RoundProgressModule, ROUND_PROGRESS_DEFAULTS_PROVIDER, ROUND_PROGRESS_DEFAULTS } from 'angular-svg-round-progressbar';
import { FormsModule } from '@angular/forms';
import { ImageZoomModule } from 'angular2-image-zoom';
import { DatePipe, CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { FooterComponent } from './Footer/footer.component';
import { LoginComponent } from './Login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './Register/signup.component';
import { HomeComponent } from './Home/home.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartUpdateService } from './Shared/cartupdate.service';
import { AuthGuard } from './Auth/auth.guard';
import { AppHttpInterceptorService } from './HttpInterceptor/app-http-interceptor.service';
import { HomeService } from './Shared/home.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    ProductDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxInputStarRatingModule,
    RoundProgressModule,
    ImageZoomModule,
    CommonModule

  ],
  providers: [{
    provide: ROUND_PROGRESS_DEFAULTS,
    useValue: {
      color: '#ffa728',
      background: '#ffa728'
    }
  }, DatePipe,
    CartUpdateService, AuthGuard,
  { provide: HTTP_INTERCEPTORS, useClass: AppHttpInterceptorService, multi: true },
  HomeService], 
  bootstrap: [AppComponent]
})
export class AppModule { }
