import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from "../../_services/authentication.service";
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';

declare var $: 'jquery';
declare var TweenLite: 'TweenLite';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['header.component.css', '../../../assets/css/bootstrap.css',
    '../../../assets/css/animate.css'
    , '../../../assets/css/style.css'
    , '../../../assets/js/plugins/fancybox/jquery.fancybox.css'
    , '../../../assets/js/plugins/rsslider/settings.css'
    , '../../../assets/js/plugins/rsslider/layers.css'
    , '../../../assets/js/plugins/rsslider/navigation.css'
    , '../../../assets/js/plugins/jquery-ui/jquery-ui.css'
    , '../../../assets/js/plugins/bootstrap-slider/bootstrap-slider.css'
    , '../../../assets/js/plugins/owl/owl.carousel.css'
  ]
})
export class HeaderComponent implements OnInit {
  islogin: boolean;
  mj_likedetails: boolean;
  mj_profilediv: boolean;
  mj_notification_detail: boolean;

  private info: any;
  constructor(private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.islogin = false
    this.mj_likedetails = false
    this.mj_profilediv = false
    this.mj_notification_detail = false
    this.islogin = false;
    if (localStorage.getItem('id_token') == null) {
     // localStorage.clear()
    }
    if (this.auth.isLoggedIn() == true) {
      this.islogin = true;
      //get info
      this.info = this.auth.getinfouser();
    }

  }
  logout() {
    localStorage.clear();
    this.islogin = false;
    this.router.navigate(['']);
    location.reload();
  }
  login() {
    if (this.islogin) {
      this.islogin = false
    } else {
      this.islogin = true
    }
  }

  clickmj_likedetails() {
    if (this.mj_likedetails) {
      this.mj_likedetails = false
    } else {
      this.mj_likedetails = true
    }

  }
  clickmj_profilediv() {
    if (this.mj_profilediv) {
      this.mj_profilediv = false
    } else {
      this.mj_profilediv = true
    }

  }
  clickmj_notification_detail() {
    if (this.mj_notification_detail) {
      this.mj_notification_detail = false
    } else {
      this.mj_notification_detail = true
    }
  }
  clicklogin() {
    this.islogin = true
  }
  clicklogout() {
    this.islogin = false
  }

}
