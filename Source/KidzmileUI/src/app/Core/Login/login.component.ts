import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { UserService } from '../Service/User/user.service';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from '../Service/Toaster/toaster';
import { AuthenticationService } from '../Authentication/authentication.service';
import { first } from 'rxjs/operators';
import { Subscription, Subject } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  username: string = "";
  password: string = "";
  private httpSubscription: Subscription;
  constructor(private userService: UserService, private router: Router, @Inject(AuthenticationService) private authenticationService,
    @Inject(ToasterService) private toaster) {

  }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    this.httpSubscription = this.authenticationService.login(userName, password)
      .subscribe((data: any) => {
        console.log('access token called');
        this.toaster.info("Login", "Login successful");
        this.router.navigate(['/home']);
      },
        (err) => {
          this.isLoginError = true;
          console.log(err);
          this.toaster.error("Login Failed", err.error_description);
        });
  }
  /* ngOnDestroy():void {
     this.httpSubscription.unsubscribe();
     
   }*/
}
