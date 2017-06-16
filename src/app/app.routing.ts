import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
  },
    //Login admin
 {
    path: 'admin',
    loadChildren: 'app/pages_admin/admin-login/admin-login.module#AdminLoginModule',
  },

  //admin
 {
    path: 'pages_admin',
    loadChildren: 'app/pages_admin/admin.module#AdminModule',
  },

  //nha tuyen dung  nhatuyendung.module NhatuyendungModule
 {
    path: 'pages_employee',
    loadChildren: 'app/pages_employee/nhatuyendung.module#NhatuyendungModule',
  },

];

export const routing = RouterModule.forRoot(routes);
