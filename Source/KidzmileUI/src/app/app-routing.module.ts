import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Core/Header/header.component';
import { FooterComponent } from './Core/Footer/footer.component';
import { LoginComponent } from './Core/Login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SignupComponent } from './Core/signup/signup.component';
import { HomeComponent } from './Home/home.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { CartMainComponent } from './Cart/cart-main.component';
import { AuthGuard } from './Core/Gaurds/auth.guard';
import { ProductListComponent } from './Product/product-list/product-list.component';
import { NgbdModalFocus } from './Core/Modal/modal-focus/modal-focus.component';
// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [
  { path: 'productList', component: ProductListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent},
  { path: 'product/:skucode', component: ProductDetailsComponent },
  { path: 'cart', component: CartMainComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

// Pass the configured routes to the forRoot() method
// to let the angular router know about our routes
// Export the imported RouterModule so router directives
// are available to the module that imports this AppRoutingModule
@NgModule({
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy},],
  imports: [ RouterModule.forRoot(appRoutes, { useHash: true }) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
