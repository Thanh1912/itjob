import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ToastComponent } from './toast/toast.component';
import { CommonModule } from '@angular/common'; //<-- This one 
@NgModule({
  imports: [
    CommonModule, //<-- and this one ,
  ],
  exports: [
    CommonModule,
    ToastComponent,
  ],
  declarations: [
    ToastComponent,
  ],
  providers: [
    ToastComponent
  ]
})
export class SharedModule { }
