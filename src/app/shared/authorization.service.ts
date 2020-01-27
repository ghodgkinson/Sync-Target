import { Injectable } from '@angular/core';
import { AuthenticationDetails, CognitoUser, CognitoUserPool, CognitoUserAttribute } from 'amazon-cognito-identity-js';
//Chandra: To resolve error
//import { Observable } from 'rxjs/Observable';
import { Observable, Subscription } from 'rxjs';
import { ApplicationService } from './application.service';
import { UserProfile } from '../core/models/application.model';
const poolData = {
  /*Vish Created Pool */
  UserPoolId: 'us-east-2_S1pahDb9M', // Your user pool id here
  ClientId: '74pbcrqgdjppu78qe049bm620q' // Your client id here      

  /*   Chandra Created Pool
    UserPoolId: 'us-west-2_IfsS9Ncca',// Your user pool id here
    ClientId: '1nlchkogr8vokq2tghj3f1ihef'// Your client id here         */
};

const userPool = new CognitoUserPool(poolData);

@Injectable({ providedIn: 'root' })
export class AuthorizationService {

  cognitoUser: CognitoUser;
  loginUserName: string;
  signInObservable: any;
  constructor(private appService: ApplicationService) { }

  register(email, password, firstName?: string, lastName?: string, ssn?: string, address1?: string, address2?: string, city?: string, state?: string, zipCode?: string,
    accountNumber?: string, webAccesCode?: string) {

    const attributeList = [];

    const uafirstName = new CognitoUserAttribute({ Name: 'custom:firstname', Value: firstName })
    const ualastName = new CognitoUserAttribute({ Name: 'custom:lastname', Value: lastName })
    const uaSSN = new CognitoUserAttribute({ Name: 'custom:ssn', Value: ssn })
    const uaAddress1 = new CognitoUserAttribute({ Name: 'custom:address1', Value: address1 })
    const uaAddress2 = new CognitoUserAttribute({ Name: 'custom:address2', Value: address2 })
    const uaCity = new CognitoUserAttribute({ Name: 'custom:city', Value: city })
    const uaState = new CognitoUserAttribute({ Name: 'custom:state', Value: state })
    const uaZipCode = new CognitoUserAttribute({ Name: 'custom:zip', Value: zipCode })
    const uaAccountNumber = new CognitoUserAttribute({ Name: 'custom:accountnumber', Value: accountNumber })
    const uaWebAccessCode = new CognitoUserAttribute({ Name: 'custom:webaccesscode', Value: webAccesCode })

    attributeList.push(uafirstName, ualastName, uaSSN, uaAddress1, uaAddress2, uaCity, uaState, uaZipCode, uaAccountNumber, uaWebAccessCode);


    return Observable.create(observer => {
      userPool.signUp(email, password, attributeList, null, (err, result) => {
        if (err) {
          console.log("signUp error", err);
          observer.error(err);
        }
        else {
          this.cognitoUser = result.user;
          console.log("signUp success", result);
          observer.next(result);
          observer.complete();
        }
      });
    });

  }

  confirmAuthCode(code) {
    const user = {
      Username: this.cognitoUser.getUsername(),
      Pool: userPool
    };
    return Observable.create(observer => {
      const cognitoUser = new CognitoUser(user);
      cognitoUser.confirmRegistration(code, true, function (err, result) {
        if (err) {
          console.log(err);
          observer.error(err);
        }
        console.log("confirmAuthCode() success", result);
        observer.next(result);
        observer.complete();
      });
    });
  }

  signIn(email, password) {

    const authenticationData = {
      Username: email,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);

    const userData = {
      Username: email,
      Pool: userPool
    };
    this.cognitoUser = new CognitoUser(userData);
    let self = this;

    this.signInObservable = Observable.create(observer => {

      this.cognitoUser.authenticateUser(authenticationDetails, {
        onSuccess: function (result) {
          //var accessToken = result.getAccessToken().getJwtToken();
         
          //TODO: get it reviewed by Vish, To Build User Name for displaying on Dashboard
          self.cognitoUser.getUserAttributes(function (err, result) {
            if (err) {
              console.log(err);
              return err;
            }
            if (result) {
              self.parseUserProfile(result);
              // console.log("isClass.loginUserName: " + thisClass.loginUserName);
            }
          });
          //

          observer.next(result);
          observer.complete();
        },
        onFailure: function (err) {
          console.log(err);
          observer.error(err);
        },
      });
    });

    return this.signInObservable;
  }

  isLoggedIn() {
    return userPool.getCurrentUser() != null;
  }

  getAuthenticatedUser() {
    // gets the current user from the local storage
    return userPool.getCurrentUser();
  }

  logOut() {
    this.getAuthenticatedUser().signOut();
    this.cognitoUser = null;
  }

  parseUserProfile(result) {
    let userProfile:any = {};

    for (var i = 0; i < result.length; i++) {

      switch (result[i].getName()) {
        case "custom:firstname":
          userProfile.firstName = result[i].getValue();
          break;
        case "custom:lastname":
          userProfile.lastName = result[i].getValue();
          break;
        case "custom:ssn":
          userProfile.ssn = result[i].getValue();
          break;
        case "custom:address1":
          userProfile.address_1 = result[i].getValue();
          break;
        case "custom:address2":
          userProfile.address_2 = result[i].getValue();
          break;
        case "custom:city":
          userProfile.city = result[i].getValue();
          break;
        case "custom:state":
          userProfile.state = result[i].getValue();
          break;
        case "custom:zip":
          userProfile.zipCode = result[i].getValue();
          break;
        case "email_verified":
          userProfile.emailVerified = result[i].getValue();
          break;
        case "email":
          userProfile.email = result[i].getValue();
          break;
        default:
          break;
      }
    }
    userProfile.fullName = userProfile.firstName + " " + userProfile.lastName;
    userProfile.fullAddress = userProfile.address_1 + " " + userProfile.address_2 + " " + userProfile.city + ", " + userProfile.state + ", " + userProfile.zipCode;
    this.appService.userProfile = userProfile;
  }
}
