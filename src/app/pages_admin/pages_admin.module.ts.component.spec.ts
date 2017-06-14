/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pages_admin.module.tsComponent } from './pages_admin.module.ts.component';

describe('Pages_admin.module.tsComponent', () => {
  let component: Pages_admin.module.tsComponent;
  let fixture: ComponentFixture<Pages_admin.module.tsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pages_admin.module.tsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pages_admin.module.tsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});