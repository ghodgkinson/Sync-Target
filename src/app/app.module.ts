import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { CarouselModule} from 'primeng/carousel';
import {AuthorizationService} from "./shared/authorization.service";
import { SignupComponent } from './auth/signup/signup.component';
import { RegisteruserComponent } from './auth/registeruser/registeruser.component';
import { EqualValidator } from './shared/equal-validator.directive';
import { SharedModule } from './core/shared/modules/shared.modules';
import { FeatureModule } from './features/feature.module';
import { ApplicationService } from './shared/application.service';
import { ContentfulService } from './shared/contentful.service';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    SignupComponent,
    RegisteruserComponent,
    EqualValidator,
  ],
  imports: [
    CarouselModule,
    SharedModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FeatureModule
  ],
  providers: [AuthorizationService, ApplicationService, ContentfulService],
  bootstrap: [AppComponent]
})
export class AppModule { }
