import { ChangePasswordComponent } from './../ChangePassword/change-password.component';
import { ModalBasicComponent } from './../Modal/modal-basic/modal-basic.component';
import { Component, Input, Output, EventEmitter,OnInit, Inject } from '@angular/core';
import { CartUpdateService } from '../../Shared/cartupdate.service';
import { Router } from '@angular/router';
import { ToasterService } from '../Service/Toaster/toaster';
import { HomeService } from '../../Shared/home.service';
import { Login } from '../Model/Login/login.model';
import { AuthenticationService } from '../Authentication/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  constructor(public _cartDataService: CartUpdateService, private router: Router,private homeSharedService:HomeService ,@Inject(AuthenticationService) private authenticationService,
  private modalService: NgbModal, private toaster: ToasterService) {

  }

  ngOnInit(): void {
    this.homeSharedService.isUserAuthenticated.subscribe( value => {
      this.loggedInUserDetails = value;
  });
  }

  logout() {
    localStorage.removeItem("currentUserToken");
    this.isUserAuthenticated = false;
    this.loggedInUserDetails = null;
    this.toaster.success("Log Out", "Logged Out successfully");
    this.router.navigate(["\login"]);
  }

  openLogOutModal() {
    const modalRef = this.modalService.open(ModalBasicComponent);
    modalRef.componentInstance.title = 'LogOut';
    modalRef.result.then(result=>{
      if(result=="True"){
        this.logout();
      }
    })
  }

  openChangePasswordModal(){
    const modalRef = this.modalService.open(ChangePasswordComponent);
    modalRef.componentInstance.title = 'ChangePassword';
    modalRef.result.then(result=>{
      if(result=="True"){
        this.logout();
      }
    })
  }
}
