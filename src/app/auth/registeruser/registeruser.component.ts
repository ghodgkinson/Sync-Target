import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { AuthorizationService } from "../../shared/authorization.service";
import { ActivatedRoute, Router } from '@angular/router';
import { usaStates } from 'typed-usa-states';
import { IUSAState } from 'typed-usa-states';
import { Subscription } from 'rxjs';
import { ApplicationService } from 'src/app/shared/application.service';

@Component({
  selector: 'app-registeruser',
  templateUrl: './registeruser.component.html',
  styleUrls: ['./registeruser.component.css']
})
export class RegisteruserComponent implements OnInit {

  confirmCode: boolean = false;
  codeWasConfirmed: boolean = false;
  listOfStates: IUSAState[];
  errorMessage: string = null;
  loginerrorMessage: string = null;
  private registerSubscription: Subscription;
  private confCodeSubscription: Subscription;
  private signInSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private auth: AuthorizationService,
    private router: Router,
    private appService: ApplicationService) {
    this.listOfStates = usaStates;
  }

  ngOnInit() {
  }

  validateAuthCode(form: NgForm) {
    const code = form.value.code;
    this.appService.showSpinner = true;
    this.errorMessage = null;

    this.confCodeSubscription = this.auth.confirmAuthCode(code).subscribe(
      (data) => {
        //this._router.navigateByUrl('/');
        this.codeWasConfirmed = true;
        this.confirmCode = false;
        this.appService.showSpinner = false;
      },
      (err) => {
        this.appService.showSpinner = false;
        this.errorMessage = err.message;
      });
  }//end of validaetAuthCode

  onSubmit(form: NgForm) {
    //TODO: Form Validation
    if (!form.valid) {
      this.errorMessage = "Form State Invalid, ensure valuesl provided in all required fields.";
      return;
    }

    //User Registration

    this.errorMessage = null;

    const email = form.value.inputEmail;
    const password = form.value.inputPassword_1;
    const firstName = form.value.firstname;
    const lastName = form.value.lastname;
    const ssn = form.value.ssn;
    const address1 = form.value.address_1;
    const address2 = form.value.address_2;
    const city = form.value.city;
    const state = form.value.stateSelected;
    const zipCode = form.value.zipcode;
    const accountNumber = form.value.accountnumber;
    const webAccessCode = form.value.webaccesscode;


    this.registerSubscription = this.auth.register(email, password, firstName, lastName, ssn, address1, address2, city, state, zipCode, accountNumber, webAccessCode).subscribe(
      (data) => {
        this.confirmCode = true;
      },
      (err) => {
        this.errorMessage = err.message;
      }
    );
  } //end of onSubmit(form:NgForm){


  signIn(form: NgForm) {
    //this.router.navigate([''], {relativeTo: this.route});
    this.loginerrorMessage = null;
    const email = form.value.loginEmail;
    const password = form.value.loginPassword;

    this.signInSubscription = this.auth.signIn(email, password).subscribe((data) => {
      //this._router.navigateByUrl('/');
      this.router.navigate(['../dashboard'], { relativeTo: this.route });
    }, (err) => {
      this.loginerrorMessage = err.message;
    });
  }

  ngOnDestroy(): void {
    if (this.registerSubscription != undefined){this.registerSubscription.unsubscribe();}
    if (this.confCodeSubscription != undefined){this.confCodeSubscription.unsubscribe();}
    if (this.signInSubscription != undefined){this.signInSubscription.unsubscribe();}
   
  }
}
