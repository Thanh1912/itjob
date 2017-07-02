import {NgModule,CUSTOM_ELEMENTS_SCHEMA}       from '@angular/core';
import {CommonModule}   from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import {AdminComponent}           from './admin.component';
import {AdminHomeComponent}       from './admin-home/admin-home.component';
import {AdminRoutingModule}       from './admin-routing.module';


import {DuyetNhaTuyenDungComponent} from './duyet-nha-tuyen-dung/duyet-nha-tuyen-dung.component';
import { QuanLiNganhNgheComponent } from './quan-li-nganh-nghe/quan-li-nganh-nghe.component';

import { QuanLiThanhVienComponent } from './quan-li-thanh-vien/quan-li-thanh-vien.component';
import { QuanliThanhvienquantriService } from './../services/quanli-thanhvienquantri.service';
import { DistrictComponent } from './district/district.component';
import { WorkplaceComponent } from './workplace/workplace.component';
import { CountryComponent } from './country/country.component';
import { AuthenticationService } from '../_services/authentication.service';
import { ErrorService } from './../error/error.service';
import { ToastComponent } from './../shared/toast/toast.component';

//======================Service=============================
import { CompanysizeComponent } from './companysize/companysize.component';
import { QuanliNtdService } from './../services/quanli-ntd.service';
import { DistrictService } from './../services/district.service';
import { WorkplaceService } from './../services/workplace.service';
import { CompanysizeService } from './../services/companysize.service';
import { countryService } from './../services/country.service';
import { PagerService } from './../_services/pager.service';
import { KeywordService } from './../services/keyword.service';
import { SliderComponent } from './slider/slider.component';
import { ListJobComponent } from './list-job/list-job.component';
import { CatalogJobComponent } from './catalog-job/catalog-job.component';
import { DuyetntdPipe } from '../Pipes/duyetntd.pipe';
import { PostService } from './../services/post.service';
import { JobcategoryService } from './../services/jobcategory.service';
import { sliderService } from './../services/slider.service';
import { JobService } from './../services/job.service';

//======================Service=============================
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  declarations: [
    AdminComponent,
    AdminHomeComponent,
    DuyetNhaTuyenDungComponent,
    QuanLiNganhNgheComponent,
    QuanLiThanhVienComponent,
    CompanysizeComponent,
    DistrictComponent,
    WorkplaceComponent,
    CountryComponent,
    SliderComponent,
    ListJobComponent,
    CatalogJobComponent,
    DuyetntdPipe
  ],
   providers: [JobService,sliderService,JobcategoryService,PostService,ToastComponent,ErrorService,AuthenticationService,PagerService,KeywordService,WorkplaceService, DistrictService,countryService,QuanliThanhvienquantriService,CompanysizeService,QuanliNtdService],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AdminModule {
}


