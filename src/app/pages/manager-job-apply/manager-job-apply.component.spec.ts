import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagerJobApplyComponent } from './manager-job-apply.component';

describe('ManagerJobApplyComponent', () => {
  let component: ManagerJobApplyComponent;
  let fixture: ComponentFixture<ManagerJobApplyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagerJobApplyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagerJobApplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
