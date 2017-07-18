import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginNtdComponent } from './login-ntd.component';

const loginRoutes: Routes = [
  {
    path: 'login-ntd',
    component: LoginNtdComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }


