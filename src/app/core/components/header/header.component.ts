import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {AuthorizationService} from "../../../shared/authorization.service";
import { ApplicationService } from 'src/app/shared/application.service';
declare var jQuery:any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  errorMessage: string = null;
  isLoginSucess: boolean;
  userLogin: string = "Log In";
  userLoginDataTarget: string = "#loginModal";
  isUserLoggedIn = false;

  constructor(private route: ActivatedRoute,
    private auth: AuthorizationService,
    private router: Router,
    private appService:ApplicationService) { }

  ngOnInit() {
    this.userLogin = !this.auth.isLoggedIn() ? 'Log In' : 'Log Out';
    if(this.auth.isLoggedIn()) {
      this.isUserLoggedIn = true;
    }
  }

  loginClickhandler(event) {
    event.preventDefault();
    this.appService.showSpinner = true;
    if(this.userLogin === 'Log Out') {
      this.auth.logOut();
      this.userLogin = 'Log In';
      this.router.navigate(['login'])
      setTimeout(() => {
        this.isUserLoggedIn = false;
        this.appService.showSpinner = false;
      }, 500 );

      jQuery("#loginModal").modal("hide");
    } else {
      this.appService.showSpinner = false;
    }
    
  }

  onSubmit(form:NgForm) {
    
    //this.router.navigate([''], {relativeTo: this.route});
    const email = form.value.inputLoginEmail;
    const password = form.value.inputPassword;
    this.appService.showSpinner = true;
    console.log("onSubmit called")
    this.auth.signIn(email, password).subscribe((data) => {
      this.isLoginSucess = true;
      // this.display = "none";
      jQuery("#loginModal").modal("hide");
      console.log("onSubmit success called")
        this.router.navigate(['dashboard'], {relativeTo: this.route});
        this.appService.showSpinner = false;
        this.userLogin = 'Log Out';
    }, (err)=> {
      //console.log(err.message);
      this.errorMessage = err.message;
      this.appService.showSpinner = false;
    });      
  }
}
