import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import {AuthorizationService} from "../../shared/authorization.service";
import { ApplicationService } from 'src/app/shared/application.service';
import { ContentfulService } from '../../shared/contentful.service';
declare var jQuery:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  errorMessage: string = null;
  @ViewChild('loginModel', {static: true}) public loginModel: any;
  isLoginSucess: boolean;
  display: string;
  cmsImages: any;
  carouselItems: Array<any> = [];

  constructor(private route: ActivatedRoute,
    private auth: AuthorizationService,
    private router: Router,
    private appService:ApplicationService,
    private contentfulService: ContentfulService) { }

  ngOnInit() {
    // this.contentfulService.getAssets().then((data) => {
    //   console.log(data);
    //   this.cmsImages = data.items.map((o) => {
    //     return o.fields.file.url;
    //   })
    // })
    this.contentfulService.getCarouselItems().subscribe((data) => {
      console.log(data);
      // this.carouselItems.push([{}]);
        this.cmsImages = data.items.map((o) => {
        return o.fields.heroPic.fields.file.url;
      })
      data.items.forEach(item => {
        const obj = {
          title: item.fields.heroPic.fields.title,
          url: item.fields.heroPic.fields.file.url,
          blurb: item.fields.blurb
        };
        this.carouselItems.push(obj);
      });
      console.log(this.carouselItems)
    },
    (err)=> {
      console.log(err);
    })
  }

  openModal() {
    console.log("openModal called")
    this.display = "block";
  }

  onSubmit(form:NgForm, loginModelRef:any) {
    
    //this.router.navigate([''], {relativeTo: this.route});
    const email = form.value.inputEmail;
    const password = form.value.inputPassword;
    this.appService.showSpinner = true;
    console.log("onSubmit called")
    this.auth.signIn(email, password).subscribe((data) => {
      this.isLoginSucess = true;
      // this.display = "none";
      jQuery("#exampleModal").modal("hide");
      console.log("onSubmit success called")
        this.router.navigate(['dashboard'], {relativeTo: this.route});
        this.appService.showSpinner = false;
    }, (err)=> {
      this.errorMessage = err.message;
      this.appService.showSpinner = false;
    });      
  }
}
