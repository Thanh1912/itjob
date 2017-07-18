import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoginNtdComponent } from './login-ntd.component';
import { LoginRoutingModule } from './login_routing.module';

@NgModule({
  imports: [
     CommonModule,
    FormsModule,
    LoginRoutingModule
  ],
  declarations: [LoginNtdComponent],

})
export class LoginNtdModule { }



