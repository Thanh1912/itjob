import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { Search2Component } from './search2/search2.component';
import { LoginNtdComponent } from './login-ntd/login-ntd.component';
import { AuthenticationService } from './_services/authentication.service';
@NgModule({
  declarations: [
    AppComponent,
    Search2Component,
  LoginNtdComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
