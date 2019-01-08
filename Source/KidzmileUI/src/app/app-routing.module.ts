import { Router } from '@angular/router';
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
import { AuthGuard } from './Core/Gaurds/auth.guard';
import { ChangePasswordComponent } from './Core/ChangePassword/change-password.component';
import { ForgotPasswordComponent } from './Core/ForgotPassword/forgot-password.component';
import { FaqsComponent } from './Core/FAQs/faqs.component';
import { ReturnpolicyComponent } from './Core/ReturnPolicy/returnpolicy.component';
import { AboutusComponent } from './Core/Aboutus/aboutus.component';
import { PageNotFoundComponent } from './Core/PageNotFound/page-not-found.component';

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
    path: 'changepassword',
    component: ChangePasswordComponent,
    //commenting as on refresh loosing username
    //canActivate:[AuthGuard]
  },
  {
    path: 'forgotpassword',
    component: ForgotPasswordComponent,
    //commenting as on refresh loosing username
    //canActivate:[AuthGuard]
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
    path: 'aboutus',
    component: AboutusComponent
  },
  {
    path: 'returnpolicy',
    component: ReturnpolicyComponent
  },
  {
    path: 'faqs',
    component: FaqsComponent
  },
  {
    path: 'error',
    component: PageNotFoundComponent
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
export class AppRoutingModule {

  constructor(private _router:Router) {
    this._router.errorHandler=(error:any)=>{
      this._router.navigate(['/error'])
    }
  }
}
