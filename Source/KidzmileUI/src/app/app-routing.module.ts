import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppComponent } from './app.component';
import { HeaderComponent } from './core/Header/header.component';
import { FooterComponent } from './core/Footer/footer.component';
import { LoginComponent } from './Core/Login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { SignupComponent } from './Core/Register/signup.component';
import { HomeComponent } from './Home/home.component';
import { ProductDetailsComponent } from './Product/product-details/product-details.component';
import { EmptycartcomponentComponent } from './Cart/emptycartcomponent/emptycartcomponent.component';
import { AuthGuard } from './Auth/auth.guard';
// The last route is the empty path route. This specifies
// the route to redirect to if the client side path is empty.
const appRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'home', component: HomeComponent},
  { path: 'product', component: ProductDetailsComponent },
  { path: 'cart', component: EmptycartcomponentComponent},
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
