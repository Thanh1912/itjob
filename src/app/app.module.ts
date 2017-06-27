import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { Search2Component } from './search2/search2.component';
import { LoginNtdComponent } from './login-ntd/login-ntd.component';
import { AuthenticationService } from './_services/authentication.service';
import { ErrorService } from './error/error.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationComponent } from './animation/animation.component';
import { DemocodeComponent } from './democode/democode.component';
import { SearchCandidatesComponent } from './search-candidates/search-candidates.component';

import { RateComponent } from './directive/rate/rate.component';
import { ComfirmComponent } from './directive/comfirm/comfirm.component';//<======Animation
import { ToastComponent } from './shared/toast/toast.component';
import { SharedModule } from './shared/shared.module';
import { SearchJobPipe } from './Pipes/search-job.pipe';



@NgModule({
  declarations: [
    AppComponent,
    Search2Component,
    LoginNtdComponent,
    AnimationComponent,
    DemocodeComponent,
    SearchCandidatesComponent,
    RateComponent,
    ComfirmComponent,
    SearchJobPipe,
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    SharedModule,
    BrowserAnimationsModule  //<======Animation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthenticationService, ErrorService, ToastComponent,ComfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
