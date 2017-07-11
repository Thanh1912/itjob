import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DanhSachBaiDangComponent } from './danh-sach-bai-dang/danh-sach-bai-dang.component';
import { CompanyComponent } from './company/company.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { JobComponent } from './job/job.component';
import { NhatuyendungComponent } from './nhatuyendung.component';
import { EditBaidangComponent } from './edit-baidang/edit-baidang.component';
import { ViewprofileComponent } from './viewprofile/viewprofile.component';
const adminRoutes: Routes = [
  {
    path: '',
    component: NhatuyendungComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        // canActivateChild: [AuthGuard],
        children: [
          { path: 'job', component: JobComponent },
          { path: 'application/:id', component: ApplicantComponent },
          { path: 'company', component: CompanyComponent },
          { path: '', component: DanhSachBaiDangComponent },
          { path: 'edit-baidang/:id', component: EditBaidangComponent },
          { path: 'view', component: ViewprofileComponent },


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
export class NhatuyendungRoutingModule { }

