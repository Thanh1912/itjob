import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AddBlogComponent } from './add-blog/add-blog.component';
import { DuyetNhaTuyenDungComponent } from './duyet-nha-tuyen-dung/duyet-nha-tuyen-dung.component';
import { QuanLiNganhNgheComponent } from './quan-li-nganh-nghe/quan-li-nganh-nghe.component';
import { QuanLiDiaDiemComponent } from './quan-li-dia-diem/quan-li-dia-diem.component';
import { QuanLiThanhVienComponent } from './quan-li-thanh-vien/quan-li-thanh-vien.component';
import { CompanysizeComponent } from './companysize/companysize.component';
import { DistrictComponent } from './district/district.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { CountryComponent } from './country/country.component';
const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'duyet-nha-tuyen-dung', component: DuyetNhaTuyenDungComponent },
          { path: 'quan-li-nganh-nghe', component: QuanLiNganhNgheComponent },
     //     { path: 'quan-li-dia-diem', component: VitriComponent },
          { path: 'login', component: AdminLoginComponent },
          { path: 'quan-li-thanh-vien', component: QuanLiThanhVienComponent },
          { path: 'companysize', component: CompanysizeComponent },
          { path: 'district', component: DistrictComponent },
          { path: 'workplace', component: WorkplaceComponent },
          { path: 'country', component: CountryComponent },

          { path: '', component: AdminHomeComponent }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AdminRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/
