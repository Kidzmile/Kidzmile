import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { CartUpdateService } from '../Shared/cartupdate.service';
import { Router } from '@angular/router';
import { ToasterServiceService } from '../Service/Toaster/toaster';
import { HomeService } from '../Shared/home.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss',
  ],

})

export class HeaderComponent implements OnInit {

  @Input() cartUpdated: Number;
  
  isUserAuthenticated: boolean = false;
  loggedInUserDetails: {};
  cartUpdate: Number;
  constructor(private _cartDataService: CartUpdateService, private router: Router,private homeSharedService:HomeService , private toaster: ToasterServiceService) {

  }

  ngOnInit(): void {
    this.homeSharedService.isUserAuthenticated.subscribe( value => {
      this.loggedInUserDetails = value;
  });
  }


  // handleNotify(isAuthenticated: boolean) {
  //   console.log("handleNotify called ");
  //   this.isUserAuthenticated = isAuthenticated;
  // }
  logout() {
    console.log("logout");
    localStorage.removeItem("userToken");
    this.isUserAuthenticated = false;
    this.loggedInUserDetails={};
    this.toaster.success("Log Out", "Logged Out successfully");
    this.router.navigate(["\login"]);
  }
}
