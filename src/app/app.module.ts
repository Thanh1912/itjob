import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { routing } from './app.routing';

import { LoginNtdComponent } from './login-ntd/login-ntd.component';
import { AuthenticationService } from './_services/authentication.service';
import { ErrorService } from './error/error.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AnimationComponent } from './animation/animation.component';
import { DemocodeComponent } from './democode/democode.component';
import { FileSelectDirective } from 'ng2-file-upload';
import { RateComponent } from './directive/rate/rate.component';
import { ComfirmComponent } from './directive/comfirm/comfirm.component';//<======Animation
import { ToastComponent } from './shared/toast/toast.component';
import { SharedModule } from './shared/shared.module';
import { SearchJobPipe } from './Pipes/search-job.pipe';
import {CKEditorModule} from 'ng2-ckeditor';
import { SearchPipe } from './Pipes/search.pipe';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { AuthGuard } from './_guards/index';
import { AuthGuardAmin } from './_guards/auth_admin.guard';
import { AuthGuardnhatuyendung } from './_guards/auth_nhatuyendung.guard';
import { Demo01Component } from './demo01/demo01.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginNtdComponent,
    AnimationComponent,
    DemocodeComponent,
    RateComponent,
    ComfirmComponent,
    SearchJobPipe,
    SearchPipe,
    PageNotFoundComponent,
    Demo01Component,
   // FileSelectDirective
  
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    CKEditorModule,
    SharedModule,
    BrowserAnimationsModule  //<======Animation
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [AuthGuardnhatuyendung,AuthGuardAmin,AuthGuard,AuthenticationService, ErrorService, ToastComponent,ComfirmComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
