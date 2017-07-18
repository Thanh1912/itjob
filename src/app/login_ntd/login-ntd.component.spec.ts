import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginNtdComponent } from './login-ntd.component';

describe('LoginNtdComponent', () => {
  let component: LoginNtdComponent;
  let fixture: ComponentFixture<LoginNtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginNtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginNtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
