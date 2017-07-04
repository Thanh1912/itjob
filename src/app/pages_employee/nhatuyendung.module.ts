import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { DanhSachBaiDangComponent } from './danh-sach-bai-dang/danh-sach-bai-dang.component';
import { CompanyComponent } from './company/company.component';
import { MemberComponent } from './member/member.component';
import { ApplicantComponent } from './applicant/applicant.component';
import { JobComponent } from './job/job.component';
import { NhatuyendungRoutingModule } from './nhatuyendung-routing.module';
import { NhatuyendungComponent } from './nhatuyendung.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { ReadPdfComponent } from './read-pdf/read-pdf.component'; // <-- NgModel lives here
import { PdfViewerComponent } from 'ng2-pdf-viewer';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { FileSelectDirective } from 'ng2-file-upload';
import { FormGroup, FormControl, Validators, FormBuilder }  from '@angular/forms';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { KeywordService } from './../services/keyword.service';
import { WorkplaceService } from './../services/workplace.service';
import { DistrictService } from './../services/district.service';
import { CompanysizeService } from './../services/companysize.service';
import { countryService } from './../services/country.service';
import { PostService } from './../services/post.service';
import { QuanliNtdService } from './../services/quanli-ntd.service';
import { EditBaidangComponent } from './edit-baidang/edit-baidang.component';
import { JobcategoryService } from './../services/jobcategory.service';


@NgModule({
  imports: [
    CommonModule,
    NhatuyendungRoutingModule,
    CKEditorModule,
     FormsModule,
      MultiselectDropdownModule,
     ReactiveFormsModule,// <-- import the FormsModule before binding with [(ngModel)]
  ],
  declarations: [
   FileSelectDirective,
    DanhSachBaiDangComponent,
    CompanyComponent,
    MemberComponent,
    ApplicantComponent,
    JobComponent,
    NhatuyendungComponent,
    ReadPdfComponent,PdfViewerComponent, HeroSearchComponent, EditBaidangComponent
  ],
 providers: [JobcategoryService,QuanliNtdService,KeywordService,WorkplaceService,PostService, DistrictService,countryService,CompanysizeService]
})
export class NhatuyendungModule {

}


