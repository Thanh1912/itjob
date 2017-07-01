import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateInfoUserComponent } from './update-info-user.component';

describe('UpdateInfoUserComponent', () => {
  let component: UpdateInfoUserComponent;
  let fixture: ComponentFixture<UpdateInfoUserComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateInfoUserComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateInfoUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
