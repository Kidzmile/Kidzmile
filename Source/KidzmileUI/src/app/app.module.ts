import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component'
import { FooterComponent } from './Footer/footer.component';
import { LoginComponent } from './Login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { SignupComponent } from './Register/signup.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
