import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: string = '';

  constructor() { }

  getLoginStatus(): any {
    const token = localStorage.getItem('token');
    if (token) {
      return true;
    } else {
      return false;
    }
  }

  // setLoginStatus(userType: any): any {
  //   this.currentUser = userType;
  //   console.log("CUR USR: ", userType, "SET: ", this.currentUser);
  // }

  getIsUserLoggedIn():any {
    console.log("USR: ", localStorage.getItem('token'));
    if (localStorage.getItem('token') === "admin") return false;
    else return true;
  }

}
