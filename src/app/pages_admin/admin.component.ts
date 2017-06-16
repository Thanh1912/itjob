import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from './../_services/authentication.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: `./admin.component.html`,
  styleUrls: ['../../assets/Back-end/bootstrap/css/bootstrap.min.css',
    
    '../../assets/Back-end/dist/css/AdminLTE.css',
    '../../assets/Back-end/dist/css/skins/skin-blue.min.css',
    '../../assets/Back-end/plugins/ionslider/ion.rangeSlider.css',
    '../../assets/Back-end/plugins/ionslider/ion.rangeSlider.skinNice.css']
})
export class AdminComponent implements OnInit {
  islogin: boolean = false;
  username: string = null;
  constructor(private Auth_Service: AuthenticationService, private _Router: Router) { }
  logout() {
    this.Auth_Service.logout();
    alert(' da thoat!');
    this._Router.navigate(['/login-admin']);
  }

  ngOnInit() {
    if (localStorage.getItem('id_token') != null && localStorage.getItem('currentUserRole') == 'admin') {
      this.username = localStorage.getItem('usernameAdmin');
      this.islogin = true;
    }

  }
}


