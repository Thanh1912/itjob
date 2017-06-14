/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Pages_employee.module.tsComponent } from './pages_employee.module.ts.component';

describe('Pages_employee.module.tsComponent', () => {
  let component: Pages_employee.module.tsComponent;
  let fixture: ComponentFixture<Pages_employee.module.tsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Pages_employee.module.tsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Pages_employee.module.tsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});