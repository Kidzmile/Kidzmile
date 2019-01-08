import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  isLoadingIndicator: boolean = false;
  forgetpwdForm: FormGroup;
  validationMessage = {
    userid: {
      required: "Required",
      pattern: "email is invalid"
    }
  };

  formErrors = {
    userid: ""
  };

  constructor(private _fb: FormBuilder,) { }

  ngOnInit() {
    this.forgetpwdForm = this._fb.group({
      userid: [
        "",
        [Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]
      ]
    });

    this.forgetpwdForm.valueChanges.subscribe((data) => {
      this.validationErrors(this.forgetpwdForm);
    });
  }

  validationErrors(group: FormGroup = this.forgetpwdForm): void {
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

  OnSubmit() {
   /* this.httpSubscription = this.authenticationService
      .login(this.loginForm.controls.userid.value, this.loginForm.controls.password.value)
      .subscribe(
        (data: any) => {
          this.isLoadingIndicator = true;
          console.log("access token called");
          this._toaster.info("Login", "Login successful");
          this._router.navigate(["/home"]);
          this.isLoadingIndicator = false;
        },
        err => {
          this.isLoginError = true;
          console.log(err);
          this._toaster.error("Login Failed", err.error_description);
        }
      );*/
  }


}
