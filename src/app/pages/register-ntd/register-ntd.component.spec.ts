import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterNtdComponent } from './register-ntd.component';

describe('RegisterNtdComponent', () => {
  let component: RegisterNtdComponent;
  let fixture: ComponentFixture<RegisterNtdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterNtdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterNtdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
