import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Routes = [
  { path: '', redirectTo: 'pages', pathMatch: 'full' },
  {
    path: 'pages',
    loadChildren: 'app/pages/pages.module#PagesModule',
  },
];

export const routing = RouterModule.forRoot(routes);
