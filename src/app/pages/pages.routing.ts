import { Routes, RouterModule } from '@angular/router';
import { Pages } from './pages.component';
import { ModuleWithProviders } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


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
      { path: 'register', component: RegisterComponent },

    ]
  }
];

export const routing = RouterModule.forChild(routes);
