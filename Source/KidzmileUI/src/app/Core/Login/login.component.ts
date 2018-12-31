import { Component, OnInit, Inject, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { ToasterService } from "../Service/Toaster/toaster";
import { AuthenticationService } from "../Authentication/authentication.service";
import { Subscription, Subject } from "rxjs";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  isLoginError: boolean = false;
  username: string = "";
  password: string = "";
  isLoadingIndicator: boolean = false;
  loginForm: FormGroup;
  validationMessage = {
    userid: {
      required: "Required",
      pattern:"email is invalid"
    },
    password: {
      required: "Required"
    }
  };

  formErrors = {
    userid: "",
    password: ""
  };

  private httpSubscription: Subscription;
  constructor(
    private _router: Router,
    @Inject(AuthenticationService) private authenticationService,
    private _fb: FormBuilder,
    @Inject(ToasterService) private _toaster
  ) {

  }

  ngOnInit() {
    this.loginForm = this._fb.group({
      userid: [
        "",
        [Validators.required,Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')]
      ],

      password: [
        "",
        [Validators.required]
      ]
    });

    this.loginForm.valueChanges.subscribe((data)=>{
      this.validationErrors(this.loginForm);
    });
  }

  OnSubmit() {
    this.httpSubscription = this.authenticationService
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
      );
  }
  /* ngOnDestroy():void {
     this.httpSubscription.unsubscribe();

   }*/

  validationErrors(group: FormGroup = this.loginForm): void {
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
