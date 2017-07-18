import { Injectable, ViewContainerRef } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { ToastComponent } from '../shared/toast/toast.component';
@Injectable()
export class AuthGuard implements CanActivate {
  role: String;
  /* constructor(private router: Router,public toastr: ToastsManager, vcr: ViewContainerRef) {
          this.toastr.setRootViewContainerRef(vcr);
       }*/
  constructor(private toast:ToastComponent,private router: Router) {
  }
  canActivate() {
    this.role = localStorage.getItem('currentUserRole');
    
    if (localStorage.getItem('id_token') && this.role == 'thanhvien') {
      // logged in so return true
 this.toast.setMessage('you successfully registered!', 'error');
      return true;
    }
 this.toast.setMessage('you successfully registered!', 'error');
    //  this.toastr.error('Ban Khong Co Quyen Truy cap vao trang nay Vui Long Dang Nhap!', 'Error!');
    // not logged in so redirect to login page
    this.router.navigate(['/pages/login']);

    return false;
  }
}
