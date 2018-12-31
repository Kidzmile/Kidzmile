import { HomeService } from "./../../Shared/home.service";
import { ToasterService } from "./../Service/Toaster/toaster";
import { UserService } from "./../Service/User/user.service";
import { Component, OnInit } from "@angular/core";
import {
  Form,
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: "app-change-password",
  templateUrl: "./change-password.component.html",
  styleUrls: ["./change-password.component.scss"]
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: FormGroup;
  validationMessage = {
    currentpwd: {
      required: "Required",
      minlength: "Minimum 6 characters",
      maxlength: "Maximum 10 characters"
    },
    newpassword: {
      required: "Required",
      minlength: "Minimum 6 characters",
      maxlength: "Maximum 10 characters"
    },
    confirmpwd: {
      required: "Required",
      minlength: "Minimum 6 characters",
      maxlength: "Maximum 10 characters"
    },
    cnfrmpwdGroup:{
        'passwordmismatch':'Password and confirm password dont match'
    }
  };

  formErrors = {
    currentpwd: "",
    newpassword: "",
    confirmpwd: "",
    cnfrmpwdGroup:""
  };
  constructor(
    private _router: Router,
    private _fb: FormBuilder,
    private _homeService: HomeService,
    private _userService: UserService,
    private _toasterService: ToasterService
  ) {}

  ngOnInit() {
    this.changePasswordForm = this._fb.group({
      currentpwd: [
        "",
        [Validators.required, Validators.minLength(6), Validators.maxLength(10)]
      ],
      cnfrmpwdGroup: this._fb.group({
        newpassword: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10)
          ]
        ],
        confirmpwd: [
          "",
          [
            Validators.required,
            Validators.minLength(6),
            Validators.maxLength(10)
          ]
        ]
      },{validator:this.checkPasswords})
    });

    this.changePasswordForm.valueChanges.subscribe((data: string) => {
      this.validationErrors(this.changePasswordForm);
    });
  }

  OnSubmit() {
    this._userService
      .changePassword(
        this.changePasswordForm.value.currentpwd,
        this.changePasswordForm.value.cnfrmpwdGroup.confirmpwd
      )
      .subscribe(
        data => {
          if (data["StatusCode"] == 200) {
            localStorage.removeItem("currentUserToken");
            this._homeService.homeservicenext("next");
            this._toasterService.success(
              "Change Password",
              "Password Changed successfully,Login!.."
            );
            this._router.navigateByUrl("/login");
          }
        },
        error => {
          this._toasterService.error("Change Password", error.ErrorMessage);
        }
      );
  }

  validationErrors(group: FormGroup = this.changePasswordForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const abstractControl = group.get(key);

      this.formErrors[key] = "";
      if (abstractControl && !abstractControl.valid && (abstractControl.touched || abstractControl.dirty)) {
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

  checkPasswords(group: AbstractControl):{[key:string]:any }|null {
    let newPwdCtrl = group.get('newpassword');
    let cnfrmPwdCtrl = group.get('confirmpwd');
   if( newPwdCtrl.value === cnfrmPwdCtrl.value || cnfrmPwdCtrl.pristine){
     return null;
   }
   else{
     return {'passwordmismatch':true};
   }
  }

  cancel(): void {
    this._router.navigate(["\productList"]);
  }
}
