import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { LoginNtdComponent } from './login_ntd/login-ntd.component';
import { AnimationComponent } from './animation/animation.component';
import { DemocodeComponent } from './democode/democode.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuard } from './_guards/index';
import { AuthGuardAmin } from './_guards/auth_admin.guard';
import { AuthGuardnhatuyendung } from './_guards/auth_nhatuyendung.guard';
export const routes: Routes = [
  //==========================Trang Chu==========================
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
    //  canLoad: [AuthGuard]
  },
  //Login admin
  {
    path: 'admin',
    loadChildren: 'app/pages_admin/admin-login/admin-login.module#AdminLoginModule',
  },
  //==========================LOGIN Nhà Tuyen dụng======================
  {
    path: 'ntd',
    loadChildren: 'app/login_ntd/login_ntd.module#LoginNtdModule',
  },
  {
    path: 'democode',
    component: DemocodeComponent
  },
  //animation
  {
    path: 'animation',
    component: AnimationComponent
  },


  //==========================ADMIN======================
  {
    path: 'pages_admin',
    loadChildren: 'app/pages_admin/admin.module#AdminModule',
    canActivate: [AuthGuardAmin]
  },


  //==========================Nhà Tuyen dụng======================
  {
    path: 'pages_employee',
    loadChildren: 'app/pages_employee/nhatuyendung.module#NhatuyendungModule',
    canActivate: [AuthGuardnhatuyendung]
  },


  { path: '**', component: PageNotFoundComponent }

];

export const routing = RouterModule.forRoot(routes);
