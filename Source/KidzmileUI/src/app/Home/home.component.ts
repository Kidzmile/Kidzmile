import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../Core/Service/User/user.service';
import { ToasterService } from '../Core/Service/Toaster/toaster';
import { HomeService } from '../Shared/home.service';
import { Product } from '../Model/ProductModel/product.model';
import { Login } from '../Core/Model/Login/login.model';
import { ServerResponse } from '../Core/Model/Common/server-response';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class HomeComponent implements OnInit {

  loggedInUserDetails: any = null;
  isUserAuthenticated: boolean = false;
  constructor(private userService: UserService, private homeSharedService: HomeService, private toaster: ToasterService) { }


  products: Product [] = [{name : 'Pink', imageUrl: 'http://cdn.fcglcdn.com/brainbees/images/products/438x531/1301400a.jpg', average_rating: 4 },
                          {name : 'Brown', imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPieX-s57Lgh0jekrJ6X50wrG3U3h7lJ2D90RW93ssGRf17g69', average_rating: 3 } ,
                          {name : 'White', imageUrl: 'https://www.buildabear.co.uk/dw/image/v2/BBNG_PRD/on/demandware.static/-/Sites-buildabear-master/default/dwdc7fb032/25720x.jpg?sw=600&sh=600&sm=fit', average_rating: 5 }];
  

  ngOnInit() {
    this.userService.getUserClaims().subscribe((data:ServerResponse) => {
      this.loggedInUserDetails = data['Result'];
      this.isUserAuthenticated = data['Result']['isUserAuthenticated'];
      console.log("data-"+this.isUserAuthenticated);
      this.homeSharedService.isUserAuthenticated.next(this.loggedInUserDetails);
    }, (error:ServerResponse) => {
      this.toaster.error(error.errorMessage, "Something went wrong");
      console.log(error.statusCode+error.errorMessage);
      return Observable.throw(error);
    });
  }

}
