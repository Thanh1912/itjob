import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
import { ToastComponent } from './directive/toast/toast.component';
import { RateComponent } from './directive/rate/rate.component';
import { ComfirmComponent } from './directive/comfirm/comfirm.component';//<======Animation

@NgModule({
  declarations: [
    AppComponent,
    Search2Component,
  LoginNtdComponent,
  AnimationComponent,
  DemocodeComponent,
  SearchCandidatesComponent,
  ToastComponent,
  RateComponent,
  ComfirmComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    BrowserAnimationsModule  //<======Animation
  ],
  providers: [AuthenticationService,ErrorService],
  bootstrap: [AppComponent]
})
export class AppModule { }
