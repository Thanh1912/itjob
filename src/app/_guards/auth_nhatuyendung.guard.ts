import { Injectable ,ViewContainerRef} from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardnhatuyendung implements CanActivate {
  role: String;
 constructor(private router: Router){
      }
  canActivate() {
      this.role = localStorage.getItem('currentUserRole');
    if (localStorage.getItem('id_token')&& this.role=='nhatuyendung') {
      // logged in so return true
  //this.toastr.success('You Welcome Login Success NTD!', 'Success!');
      return true;
    }
    alert("Ban Khong Co Quyen Truy cap vao trang nay Vui Long Dang Nhap!")
     //  this.toastr.error('Ban Khong Co Quyen Truy cap vao trang nay Vui Long Dang Nhap!', 'Error!');
    // not logged in so redirect to login page
    this.router.navigate(['/login-ntd']);
    return false;
  }
}
