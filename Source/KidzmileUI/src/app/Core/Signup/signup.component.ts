import { Component, OnInit ,Inject} from '@angular/core';
import { User } from '../Model/User/user.model';
import { NgForm ,FormGroup,Validators,FormBuilder} from '@angular/forms';
import { UserService } from '../Service/User/user.service'
import { ToasterService} from '../Service/Toaster/toaster';
import { Observable } from 'rxjs';
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
  registrationForm: FormGroup;
  validationMessage = {
    userName: {
      required: "Required",
      minlength: "Minimum 6 characters",
      maxlength: "Maximum 30 characters",
      pattern:"email is invalid"
    },
    firstName: {
      required: "Required"
    },
    lastName: {
      required: "Required"
    },
    password: {
      required: "Required"
    },
    cnfrmpassword: {
      required: "Required"
    },
    phoneNumber: {
      required: "Required"
    }
  };

  formErrors = {
    userName: '',
    password: '',
    firstName: '',
    lastName: '',
    phoneNumber: ''
  };

  constructor(private userService: UserService,private router:Router,private _fb: FormBuilder, @Inject(ToasterService) private toaster) { }


  ngOnInit() {
    this.registrationForm = this._fb.group({
      userName: [
        "",
        [Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]
      ],

      password: [
        "",
        [Validators.required]
      ],
      cnfrmpassword: [
        "",
        [Validators.required]
      ],
      firstName:[
        "",
        [Validators.required]
      ],
      lastName:[
        "",
        [Validators.required]
      ],
      phoneNumber:[
        "",
        [Validators.required]
      ]
    });

    this.registrationForm.valueChanges.subscribe((data:string)=>{
      this.validationErrors(this.registrationForm);
    });

    //this.resetForm();
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


  OnSubmit() {
    this.userService.registerUser(this.registrationForm.value)
      .subscribe((data: ServerResponse) => {
        console.log(data['Result']);
        if (data['Result'] == "Success") {
          //this.resetForm(form);
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

  validationErrors(group: FormGroup = this.registrationForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = "";
      if (
        abstractControl &&
        !abstractControl.valid &&
        (abstractControl.touched || abstractControl.dirty)
      ) {
        const message = this.validationMessage[key];
        for (const errorkey in abstractControl.errors) {
          if (errorkey) {
            this.formErrors[key] += message[errorkey] + " ";
          }
        }
      }

      if (abstractControl instanceof FormGroup) {
        this.validationErrors(abstractControl);
      }
    });
  }
}
