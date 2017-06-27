import { Component, AfterViewInit, OnInit, ViewContainerRef, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../_services/user.model';
import { AuthenticationService } from '../_services/index';

@Component({
  selector: 'app-login-ntd',
  templateUrl: './login-ntd.component.html',
  styleUrls: ['./login-ntd.component.css']
})
export class LoginNtdComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';
  errorTitle="";
  result;

  private viewContainerRef: ViewContainerRef;
  constructor(
    private router: Router,
    private authenticationService: AuthenticationService, viewContainerRef: ViewContainerRef) {
    // You need this small hack in order to catch application root view container ref (ng2-bootstrap)
    this.viewContainerRef = viewContainerRef;
    // Breaking change solution for Angular v2.2.x
    // https://github.com/PointInside/ng2-toastr

  }
  ngOnInit() {
    // reset login status
    this.authenticationService.logout();
  }
  close(){
    this.error="";
  }
  login() {

    this.loading = true;
    const user = new User(this.model.username, this.model.password);

    this.authenticationService.signin_ntd(user)
      .subscribe(
      data => {
        // if the user credentials are correct, set the localStorage token and userId,
        // we need these info in order to do stuff later when the user is signed in and verified
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('userId_ntd', data.userId);
        localStorage.setItem('username_ntd', data.fullname);
        localStorage.setItem('currentUserRole', data.role);

        // navigate user to index page of our app
        this.router.navigate(['/pages_admin']);
        // display toastr success message pop up to inform the user that he logged in successfully

      },
      error => {
         this.errorTitle=error.title;
        this.error = error.error.message;
        this.loading = false;
      }
      );

  }
}
