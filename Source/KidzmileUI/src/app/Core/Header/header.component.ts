import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CartUpdateService } from '../../Shared/cartupdate.service';
import { Router } from '@angular/router';
import { ToasterService } from '../Service/Toaster/toaster';
import { HomeService } from '../../Shared/home.service';
import { Login } from '../Model/Login/login.model';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
  ],

})

export class HeaderComponent implements OnInit {
  @Input() cartUpdated: Number;
  isUserAuthenticated: boolean = false;
  loggedInUserDetails: Login;
  cartUpdate: Number;
  constructor(public _cartDataService: CartUpdateService, private router: Router,private homeSharedService:HomeService , private toaster: ToasterService) {

  }

  ngOnInit(): void {
    this.homeSharedService.isUserAuthenticated.subscribe( value => {
      this.loggedInUserDetails = value;
  });
  }

  logout() {
    console.log("logout");
    localStorage.removeItem("userToken");
    this.isUserAuthenticated = false;
    this.loggedInUserDetails=null;
    this.toaster.success("Log Out", "Logged Out successfully");
    this.router.navigate(["\login"]);
  }
}
