import { NgModule,}      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
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
import { Home2Component } from './home2/home2.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { Angular2SocialLoginModule } from "angular2-social-login";
import { Title }     from '@angular/platform-browser';

import { RegisterNtdComponent } from './register-ntd/register-ntd.component';

import { RegisterJobComponent } from './register-job/register-job.component';
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
  imports: [CommonModule ,routing,  ReactiveFormsModule , FormsModule,Angular2SocialLoginModule],
  declarations: [Pages, HomeComponent, LoginComponent, RegisterComponent, HeaderComponent, FooterComponent, SearchJobsComponent, DetailJobComponent, SearchCompanyComponent, DetailCompanyComponent, ManagerAccountComponent, ManagerJobApplyComponent, Home2Component, LoginEmployeeComponent, RegisterNtdComponent, RegisterJobComponent]
})
export class PagesModule {
}
Angular2SocialLoginModule.loadProvidersScripts(providers);
