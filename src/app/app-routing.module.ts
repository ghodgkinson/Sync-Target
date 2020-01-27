import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { SignupComponent } from './auth/signup/signup.component';
import { RegisteruserComponent } from './auth/registeruser/registeruser.component';
import { FeatureRoute } from './features/feature.routes';

const routes: Routes = [
  { path: '', component: LoginComponent},
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent, pathMatch: 'full' },
  { path: 'signup', component: SignupComponent, pathMatch:'full'},
  { path: 'registeruser', component: RegisteruserComponent, pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(FeatureRoute), RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
