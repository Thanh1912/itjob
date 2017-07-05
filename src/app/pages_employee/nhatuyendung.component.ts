
import { Component, OnInit, style } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  templateUrl: '/nhatuyendung.component.html',
  styleUrls: ['./styles.css']

})
export class NhatuyendungComponent implements OnInit {
  constructor(private router: Router) {
  }
  username: string;
  islogin: boolean;


  ngOnInit() {
    if (localStorage.getItem('id_token_ntd') != null) {
      this.username = localStorage.getItem('username_ntd');
      this.islogin = true;
    }
   /* else{
      alert('Vui Long đăng nhập Nhà Tuyển dụng ');
       this.router.navigate(['/login-ntd']);
    }
  */
  }
  Gohome() {
    this.router.navigate(['/pages/home']);
  }
  singout() {
    localStorage.clear();
    this.router.navigate(['/login-ntd']);
  }

}



/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
