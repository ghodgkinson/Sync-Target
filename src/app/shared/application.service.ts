import { Injectable } from '@angular/core';
import { UserProfile } from '../core/models/application.model';

@Injectable()
export class ApplicationService {
  public showSpinner = false;  
  public userProfile:UserProfile;
  
}
