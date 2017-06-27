import { Component, OnInit, HostBinding } from '@angular/core';

import { AuthService } from "angular2-social-login";
import { AuthenticationService } from "../../_services/authentication.service";
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css','../../../assets/css/bootstrap.css',
    '../../../assets/css/animate.css'
,'../../../assets/css/style.css'
,'../../../assets/js/plugins/fancybox/jquery.fancybox.css'
,'../../../assets/js/plugins/rsslider/settings.css'
,'../../../assets/js/plugins/rsslider/layers.css'
,'../../../assets/js/plugins/rsslider/navigation.css'
,'../../../assets/js/plugins/jquery-ui/jquery-ui.css'
,'../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
,'../../../assets/js/plugins/owl/owl.carousel.css']
})
export class LoginComponent implements OnInit {
  public user;
  email: string;
  pass = '';
  error = '';
  result;
  sub: any;
  constructor(public _auth: AuthService, private router: Router, private auth: AuthenticationService) { }

  signIn(provider) {
    this.sub = this._auth.login(provider).subscribe(
      (data) => {
        console.log(data); this.user = data;
        var user = {
          email: this.user.email,
          password: this.user.uid,
          fullname: this.user.name,
          profileimage :this.user.image
        }
        console.log('=====Xuat=====')
        console.log(user)
        //login tai khoan 
        this.auth.signin_tv(user)
          .subscribe(
          data => {
            localStorage.setItem('id_token', data.token);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('fullname',this.user.name);
            localStorage.setItem('username',this.user.email);
            localStorage.setItem('currentUserRole', data.role);
            // navigate user to index page of our app
               location.reload();
          this.router.navigate(['']);
         
            // display toastr success message pop up to inform the user that he logged in successfully
          },
          error => {
            //neu chua co tai khoan thi tiep theo tao tai khoan
            //====tao tai khoan trong database =====
            this.auth.signup_tv(user)
              .subscribe(
              data => {
                //dang nhap lai voi tai khoan 
                this.auth.signin_tv(user)
                  .subscribe(
                  data => {
                    localStorage.setItem('id_token', data.token);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('fullname', data.fullname);
                    localStorage.setItem('username', data.username);
                    localStorage.setItem('currentUserRole', data.role);
                    // navigate user to index page of our app
                    location.reload();
                    this.router.navigate(['']);
                  
                  },
                  error => {
                    alert('Username or password is incorrect')
                    this.error = 'Username or password is incorrect';
                  }
                  )
                //dang nhap lai voi tai khoan 
              }
              );
            //====tao tai khoan trong database =====
          }
          )
      }
    )
  }
  logout() {
    this._auth.logout().subscribe(
      (data) => { console.log(data); this.user = null; }
    )
  }

  //dang nhap 
  login(form: NgForm) {
    let user = {
      email: form.value.email,
      password: form.value.pass
    }
    this.auth.signin_tv(user)
      .subscribe(
      data => {
        // if the user credentials are correct, set the localStorage token and userId,
        // we need these info in order to do stuff later when the user is signed in and verified
        localStorage.setItem('id_token', data.token);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('fullname', data.fullname);
        localStorage.setItem('username', data.username);
        localStorage.setItem('currentUserRole', data.role);
        // navigate user to index page of our app
        location.reload();
        this.router.navigate(['']);
        // display toastr success message pop up to inform the user that he logged in successfully
      },
      error => {
        alert('Username or password is incorrect')
        this.error = 'Username or password is incorrect';
      }
      )

  }


  ngOnInit() {
  }

}