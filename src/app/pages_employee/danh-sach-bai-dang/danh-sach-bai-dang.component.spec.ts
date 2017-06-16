import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DanhSachBaiDangComponent } from './danh-sach-bai-dang.component';

describe('DanhSachBaiDangComponent', () => {
  let component: DanhSachBaiDangComponent;
  let fixture: ComponentFixture<DanhSachBaiDangComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DanhSachBaiDangComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DanhSachBaiDangComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
