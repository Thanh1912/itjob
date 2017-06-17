import { Component, AfterViewInit, OnInit, ViewContainerRef ,ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import {User} from './../../_services/user.model';
import { AuthenticationService } from './../../_services/authentication.service';
import { DataService } from './../..//services/data.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
})
export class AdminLoginComponent implements OnInit {
 model: any = {};
  loading = false;
  error = '';
  result;
  user:any;
  private viewContainerRef: ViewContainerRef;
  constructor(
    private router: Router, private dataService: DataService,
    private authenticationService: AuthenticationService) {

  }
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  login() {
    this.loading = true;
    const user = new User(this.model.username, this.model.password);
    this.authenticationService.signin(user)
      .subscribe(
        data => {
          // if the user credentials are correct, set the localStorage token and userId,
          // we need these info in order to do stuff later when the user is signed in and verified
          localStorage.setItem('id_token', data.token);
          localStorage.setItem('userId', data.userId);
            localStorage.setItem('usernameAdmin', data.fullname);
                 localStorage.setItem('currentUserRole', data.role);
          this.router.navigate(['/pages_admin']);
        },
        error => {
           this.error = 'Username or password is incorrect';
                this.loading = false;
        }
      )
  }
}






