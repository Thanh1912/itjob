import { Injectable,ViewContainerRef } from '@angular/core';
import 'rxjs/add/operator/map'
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import {User} from './user.model';
import {Nhatuyendung} from '../_models/nhatuyendung';
import {Observable} from 'rxjs';
import 'rxjs/operator/map';
import 'rxjs/operator/catch';
import {ErrorService} from '../error/error.service';
import {Reset} from './resetPassword';
//import {tokenNotExpired} from 'angular2-jwt';

@Injectable()
export class AuthenticationService {
  public token: string;
  public data: any;
  public Rest_Urlthanhvien: String = 'http://localhost:3000/api/thanhvien/';
  public Rest_Urlntd: String = 'http://localhost:3000/api/user/';
  public Rest_UrlAdmin: String = 'http://localhost:3000/api/admin/';
  private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
  private options = new RequestOptions({ headers: this.headers });
  user: any;
  constructor(private http: Http, private errorService: ErrorService) {
    // set token if saved in local storage
 //   var currentUser = JSON.parse(localStorage.getItem('currentUser'));
   // this.token = currentUser && currentUser.token;
  }
/*
  signup(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.Rest_UrlAdmin+'', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }*/
// dang ky thanh vien
    signup_tv(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.Rest_Urlthanhvien+'register/', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
//nhat tuyen dung dang ky
    signup_ntd(user: any) {
    console.log(user);
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.Rest_Urlntd+'register/', body, {headers: headers})
      .map(response => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
    }
//dang nhap admin
  // sending request to back end to login the user
  signin(user: User) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.Rest_UrlAdmin+'login/', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
//dang nhap thanh vien

  // sending request to back end to login the user
  signin_tv(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.Rest_Urlthanhvien+'login/', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }
  signin_ntd(user: any) {
    const body = JSON.stringify(user);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post(this.Rest_Urlntd+'login/', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // sending request for password reset
  forget_ntd(reset: any) {
    const body = JSON.stringify(reset);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('http://localhost:3000/api/forgot_ntd', body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // sending request with the newly created password
  reset(reset: Reset) {
    const body = JSON.stringify(reset);
    const headers = new Headers({'Content-Type': 'application/json'});
    return this.http.post('/user/reset/' + reset.token, body, {headers: headers})
      .map((response: Response) => response.json())
      .catch((error: Response) => {
        this.errorService.handleError(error.json());
        return Observable.throw(error.json());
      });
  }

  // logout function to be used in html file of both pages (login/register) in order to clear the localStorage from token and user id.
  logout() {
    localStorage.clear();
 //  this.toastr.info('You have been logged out');
  }
 // check if the user is logged in or not, if token is expired, token is deleted from localstorage
  isLoggedIn() {
    if (localStorage.getItem('id_token') == null) {
     // localStorage.clear();
      return false;
    } else
      return true;
  }
  isLoggedInE() {
    if (localStorage.getItem('id_token_ntd') == null) {
      localStorage.clear();
      return false;
    } else
      return true;
  }
  getinfouser() {
    let id_token = localStorage.getItem('id_token');
    let userId = localStorage.getItem('userId');
    let username = localStorage.getItem('fullname');
    let role = localStorage.getItem('currentUserRole');

    let userinfo = {
      id_token: id_token,
      userId: userId,
      username: username,
      role: role
    }
    return userinfo;
  }


}
