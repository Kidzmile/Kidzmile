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
import { SharedModule } from './Shared/index';
import { AuthenticationService } from './Core/Authentication/authentication.service';

import { ErrorInterceptor } from './Core/Interceptors/error.interceptor';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ModalBasicComponent } from './Core/Modal/modal-basic/modal-basic.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgbdModalFocus, NgbdModalConfirm, NgbdModalConfirmAutofocus } from './Core/Modal/modal-focus/modal-focus.component';
import { CategoriesComponent } from './sidebar/categories/categories.component';
import { CategoryService } from './Service/category.service';
import { ProductService } from './Service/product.service';
import { ProductItemComponent } from './Product/product-item/product-item.component';
import { ProductSortComponent } from './Product/product-sort/product-sort.component';
import { ModalModule } from 'ngx-bootstrap';
import { CartMainComponent } from '../app/Cart/cart-main.component';
import { EmptycartcomponentComponent} from '../app/Cart/emptycartcomponent/emptycartcomponent.component';
import { CartComponentComponent} from '../app/Cart/cart-component/cart-component.component';

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
    ProductListComponent,
    ModalBasicComponent,
    NgbdModalFocus,
    NgbdModalConfirm,
    NgbdModalConfirmAutofocus,
    CategoriesComponent,
    ProductItemComponent,
    ProductSortComponent,
    CartMainComponent,
    CartComponentComponent,
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
    SharedModule,
    NgbModule.forRoot(),
    ModalModule.forRoot()
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
    HomeService, NguCarousel, AuthenticationService, ToasterService, CategoryService, ProductService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
