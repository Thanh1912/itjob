import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBaidangComponent } from './edit-baidang.component';

describe('EditBaidangComponent', () => {
  let component: EditBaidangComponent;
  let fixture: ComponentFixture<EditBaidangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBaidangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBaidangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
