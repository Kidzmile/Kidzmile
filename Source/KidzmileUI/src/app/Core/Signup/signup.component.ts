import { Component, OnInit ,Inject} from '@angular/core';
import { User } from '../Model/User/user.model';
import { NgForm } from '@angular/forms';
import { UserService } from '../Service/User/user.service'
import { ToasterService} from '../Service/Toaster/toaster';
import { Observable } from 'rxjs';
import { AppRoutingModule } from '../../app-routing.module';
import { ServerResponse } from '../Model/Common/server-response';
import { Router } from '@angular/router';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],

})
export class SignupComponent implements OnInit {
  user: User;
  errors: string;
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

  constructor(private userService: UserService,private router:Router, @Inject(ToasterService) private toaster) { }

  OnSubmit(form: NgForm) {

    this.userService.registerUser(form.value)
      .subscribe((data: ServerResponse) => {
        console.log(data['Result']);
        if (data['Result'] == "Success") {
          this.resetForm(form);
          this.toaster.success("User registration successful");
          this.router.navigate(['/login']);
        }
        else {
          console.log(data.result);
          this.toaster.error("Data Error", data['Result']);

        }
      }, (error) => {
        this.handleError(error);
        this.toaster.info("Error", error.statusText);
        return Observable.throw(error);
      },
        () => {
          console.log("no errors write route here");
          //this.router.navigate(['/login']);
        }
      );
  }
  private handleError(error: any) {
    console.log(error);
    let errMsg = (error.message) ? error.message : error.ModelState ? `${error.status} - ${error.statusText}` : 'Server error';
    this.toaster.error("Error", errMsg);
  }
}
