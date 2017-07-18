
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { routing } from './pages.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Pages } from './pages.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { DetailJobComponent } from './detail-job/detail-job.component';
import { SearchCompanyComponent } from './search-company/search-company.component';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { ManagerAccountComponent } from './manager-account/manager-account.component';
import { ManagerJobApplyComponent } from './manager-job-apply/manager-job-apply.component';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { Title } from '@angular/platform-browser';
import { RegisterNtdComponent } from './register-ntd/register-ntd.component';
import { RegisterJobComponent } from './register-job/register-job.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { CandidateService } from '../services/candidate.service';
import { ResumeService } from './../services/resume.service';
import { FileSelectDirective } from 'ng2-file-upload';
import { UpdateInfoUserComponent } from './update-info-user/update-info-user.component';
import { QuanliNtdService } from './../services/quanli-ntd.service';
import { CompanyService } from './../services/company.service';
import { JobService } from './../services/job.service';
import { DiplomalanguageService } from './../services/diplomalanguage.service';
import { PagerService } from './../_services/pager.service';
import { JobcategoryService } from './../services/jobcategory.service';
import { WorkplaceService } from './../services/workplace.service';
import { DistrictService } from './../services/district.service';
import { ToastComponent } from '../shared/toast/toast.component';
import { sliderService } from './../services/slider.service';
import { RateService } from './../services/rate.service';
import { JobcategoryDetailService } from './../services/jobcategory-detail.service';
import { SearchPipe } from './../Pipes/search.pipe';
import { SearchCompanyPipe } from './search-company.pipe';
import { CapitalizePipe } from './Pipe/capitalize.pipe';
import { DatePipe } from '@angular/common';
import { SearchProfileComponent } from './search-profile/search-profile.component';
import { ResumePreviewComponent } from './resume-preview/resume-preview.component';
import { DetailCandidateComponent } from './detail-candidate/detail-candidate.component';
import { CKEditorModule } from 'ng2-ckeditor';
import { SharedModule } from './shared/shared.module';
let providers = {
  "google": {
    "clientId": "1075668812758-334p3amm6s3h1nsnhlhd0bl0o1qd70t5.apps.googleusercontent.com"    //meanstack
  },
  "facebook": {
    "clientId": "238814889927196",
    "apiVersion": "v2.8" //like v2.4    //Spring mvc api
  }
};
@NgModule({
  imports: [CommonModule,SharedModule, routing,CKEditorModule, ReactiveFormsModule, FormsModule, Angular2SocialLoginModule],
  declarations: [Pages,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    FooterComponent,
    SearchJobsComponent,
    DetailJobComponent,
    SearchCompanyComponent,
    DetailCompanyComponent,
    ManagerAccountComponent,
    ManagerJobApplyComponent,
    RegisterNtdComponent,
    RegisterJobComponent,
  FileSelectDirective,
    UpdateInfoUserComponent,
    SearchCompanyPipe,
    CapitalizePipe,
    SearchProfileComponent,
    ResumePreviewComponent,
    DetailCandidateComponent,
   
  ]
  , providers: [ToastComponent, DistrictService, DiplomalanguageService,sliderService,RateService,DatePipe,WorkplaceService,CapitalizePipe,SearchPipe,PagerService,JobcategoryDetailService,JobcategoryService,JobService, CompanyService, QuanliNtdService, CandidateService, ResumeService],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PagesModule {
}
Angular2SocialLoginModule.loadProvidersScripts(providers);
