import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DuyetNhaTuyenDungComponent } from './duyet-nha-tuyen-dung.component';

describe('DuyetNhaTuyenDungComponent', () => {
  let component: DuyetNhaTuyenDungComponent;
  let fixture: ComponentFixture<DuyetNhaTuyenDungComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DuyetNhaTuyenDungComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DuyetNhaTuyenDungComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
