
import { NgModule } from '@angular/core';
import { LoginComponent } from './Core/Login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SignupComponent } from './Core/signup/signup.component';
import { HomeComponent } from './Home/home.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartMainComponent } from './Cart/cart-main.component';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { ProductDetailsResolver } from './Service/productdetails.resolver.service';

const appRoutes: Routes = [
  {
    path: 'productList',
    component: ProductListComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'product/:skucode',
    component: ProductDetailsComponent,
    resolve:
    {
      productdetail: ProductDetailsResolver
    }
  },

  {
    path: 'cart',
    component: CartMainComponent
  },

  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  }
];

@NgModule({
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },],
  imports: [RouterModule.forRoot(appRoutes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
