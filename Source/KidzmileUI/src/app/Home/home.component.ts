import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UserService } from '../Service/User/user.service';
import { ToasterServiceService } from '../Service/Toaster/toaster';
import { HomeService } from '../Shared/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  loggedInUserDetails: any = null;
  isUserAuthenticated: boolean = false;
  constructor(private userService: UserService, private homeSharedService: HomeService, private toaster: ToasterServiceService) { }

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data) => {
      this.loggedInUserDetails = data;
      this.isUserAuthenticated = this.loggedInUserDetails.IsAuthenticated;
      this.homeSharedService.isUserAuthenticated.next(this.loggedInUserDetails);
    }, (error => {
      this.toaster.error(error, "Something went wrong");
      console.log(error);
    }));
  }
}
