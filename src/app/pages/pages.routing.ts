import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { SearchJobsComponent } from './search-jobs/search-jobs.component';
import { DetailJobComponent } from './detail-job/detail-job.component';
import { SearchCompanyComponent } from './search-company/search-company.component';
import { DetailCompanyComponent } from './detail-company/detail-company.component';
import { ManagerAccountComponent } from './manager-account/manager-account.component';
import { ManagerJobApplyComponent } from './manager-job-apply/manager-job-apply.component';
import { LoginEmployeeComponent } from './login-employee/login-employee.component';
import { SearchProfileComponent } from './search-profile/search-profile.component';
import { DetailCandidateComponent } from './detail-candidate/detail-candidate.component';
export const routes: Routes = [
  /* {
     path: 'login',
     loadChildren: 'app/pages/login/login.module#LoginModule'
   },
   {
     path: 'register',
     loadChildren: 'app/pages/register/register.module#RegisterModule'
   },*/
  {
    path: '',
    component: Pages,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'login', component: LoginComponent },
      { path: 'login-employee', component: LoginEmployeeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'home/search-jobs/:action/:id/:id_detail', component: SearchJobsComponent },
      //  action : catalog - id : id of catagory|all - id_detail |all
      { path: 'home/search-company', component: SearchCompanyComponent },
      { path: 'home/detail-jobs/:id', component: DetailJobComponent },
      { path: 'home/detail-company/:id', component: DetailCompanyComponent },
      { path: 'Manager-Account', component: ManagerAccountComponent },
      { path: 'Manager-JobApply', component: ManagerJobApplyComponent },
       { path: 'Search-cadidate', component: SearchProfileComponent },
         { path: 'home/detail-cadidate', component: DetailCandidateComponent },


    ]
  }
];

export const routing = RouterModule.forChild(routes);
