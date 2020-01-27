import { Component } from '@angular/core';
import { ApplicationService } from './shared/application.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AWSAngApp';
  constructor(public appService: ApplicationService) {

  }
}
