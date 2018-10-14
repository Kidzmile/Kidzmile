import { Component, OnInit } from '@angular/core';
import { User } from '../Model/User/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../Service/User/user.service'
import { ToasterServiceService } from '../toaster-service.service';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../app-routing.module';
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],

})
export class ProductDetailsComponent implements OnInit {
  user: User;
  errors:string;
  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      userName: '',
      password: '',
      email: '',
      firstName: '',
      lastName: '',
      phoneNumber: ''
    }
  }

  constructor(private userService: UserService, private toastr: ToasterServiceService) { }

  OnSubmit(form: NgForm) {
    
    this.userService.registerUser(form.value)
      .subscribe((data: any) => {
        console.log(data);
        if (data == "Success") {
          this.resetForm(form);
          this.toastr.success("User registration successful");
        }
        else {          
          this.toastr.error("Data Error",data);
          
        }
      }, (error) => {
        this.handleError(error);
        this.toastr.info("Error",error.statusText);
      },
      ()=>{
          console.log("no errors write route here");
          //this.router.navigate(['/login']);
      }
    );
} 
private handleError(error: any) { 
  console.log(error);
  let errMsg = (error.message) ? error.message : error.ModelState ? `${error.status} - ${error.statusText}` : 'Server error';
  this.toastr.error("Error",errMsg);
}
}
