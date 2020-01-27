import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthorizationService } from 'src/app/shared/authorization.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  loginUserName:string = "Chan C";
  constructor(private route: ActivatedRoute,
    private _auth: AuthorizationService,
    private _router: Router) { }

  ngOnInit() 
  {
    this.loginUserName = this._auth.loginUserName;
  }    

  doLogout(){    
    this._auth.logOut();
    this._router.navigate([''], {relativeTo: this.route});
  }
}
