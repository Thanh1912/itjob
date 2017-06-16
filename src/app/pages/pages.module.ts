import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { routing }       from './pages.routing';
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

@NgModule({
  imports: [CommonModule ,routing],
  declarations: [Pages, HomeComponent, LoginComponent, RegisterComponent, HeaderComponent, FooterComponent, SearchJobsComponent, DetailJobComponent, SearchCompanyComponent, DetailCompanyComponent, ManagerAccountComponent, ManagerJobApplyComponent, Home2Component]
})
export class PagesModule {
}
