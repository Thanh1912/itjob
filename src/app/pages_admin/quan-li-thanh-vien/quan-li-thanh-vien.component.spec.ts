import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiThanhVienComponent } from './quan-li-thanh-vien.component';

describe('QuanLiThanhVienComponent', () => {
  let component: QuanLiThanhVienComponent;
  let fixture: ComponentFixture<QuanLiThanhVienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLiThanhVienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiThanhVienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
