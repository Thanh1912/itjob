import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DanhSachBaiDangComponent } from './danh-sach-bai-dang/danh-sach-bai-dang.component';
import { CompanyComponent } from './company/company.component';
import { MemberComponent } from './member/member.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { JobComponent } from './job/job.component';
import { NhatuyendungComponent } from './nhatuyendung.component';
import { ReadPdfComponent } from './read-pdf/read-pdf.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { EditBaidangComponent } from './edit-baidang/edit-baidang.component';

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
          { path: 'member', component: MemberComponent },
          { path: '', component: DanhSachBaiDangComponent },
          { path: 'read-pdf', component: ReadPdfComponent },
          { path: 'search', component: HeroSearchComponent },
            { path: 'edit-baidang/:id', component: EditBaidangComponent },


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

