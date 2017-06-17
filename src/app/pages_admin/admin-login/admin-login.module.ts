import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminLoginComponent } from './admin-login.component';
import {AdminRoutingModule}       from './admin-routing.module';
import { FormsModule } from '@angular/forms';
@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ],
  declarations: [AdminLoginComponent]
})
export class AdminLoginModule { }
