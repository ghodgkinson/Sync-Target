import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { ActivatedRoute, Router } from '@angular/router';
import { ApplicationService } from 'src/app/shared/application.service';

// https://github.com/aws/amazon-cognito-identity-js
// https://docs.aws.amazon.com/cognito/latest/developerguide/using-amazon-cognito-user-identity-pools-javascript-examples.html


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  emailVerificationMessage: boolean = false;
  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;
  error: string = "";


  constructor(private route: ActivatedRoute,
    private auth: AuthorizationService,
    private router: Router,
    private appService: ApplicationService) { }

  register(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;
    this.appService.showSpinner = true;
    this.auth.register(email, password).subscribe(
      (data) => {
        this.confirmCode = true;
        this.appService.showSpinner = true;
      },
      (err) => {
        console.log(err);
        this.appService.showSpinner = false;
        this.error = "Registration Error has occurred";
      }
    );
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;
    this.appService.showSpinner = true;

    this.auth.confirmAuthCode(code).subscribe(
      (data) => {
        //this._router.navigateByUrl('/');
        this.codeWasConfirmed = true;
        this.confirmCode = false;
        this.appService.showSpinner = false;
      },
      (err) => {
        console.log(err);
        this.appService.showSpinner = false;
        this.error = "Confirm Authorization Error has occurred";
      });
  }//end of validaetAuthCode

  ngOnInit() {
  }


  onSubmit(form: NgForm) {
    var buttonName = document.activeElement.getAttribute("Name");

    if (buttonName === "btnLookupByEmail") {
      const email = form.value.inputEmail;
      const password = "Abc12345";
      this.appService.showSpinner = true;
      this.auth.register(email, password).subscribe(
        (data) => {
          this.confirmCode = true;
          this.appService.showSpinner = false;
        },
        (err) => {
          console.log(err);
          this.appService.showSpinner = false;
          this.error = "Error has occurred during Lookup/Registration by Email ";
        }
      );
    }

  }//end of onSubmit

}
