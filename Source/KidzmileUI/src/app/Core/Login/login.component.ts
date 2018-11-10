import { Component, OnInit } from '@angular/core';
import { UserService } from '../Service/User/user.service';
import { ToasterService } from '../Service/Toaster/toaster';
import { Router } from '@angular/router'
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  username:string="";
  password:string="";
  constructor(private userService: UserService, private router: Router, private toaster: ToasterService) {

  }

  ngOnInit() {
  }

  OnSubmit(userName, password) {
    this.userService.userAuthentication(userName, password).subscribe((data: any) => {
      localStorage.setItem('userToken', data.access_token);
      this.toaster.info("Login", "Login successful");
      this.router.navigate(['/home']);
    },
      (err: HttpErrorResponse) => {
        console.log(err);
        this.isLoginError = true;
        this.toaster.error("Login Failed", err.error.error_description);
      });
  }
}
