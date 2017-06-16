import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiDiaDiemComponent } from './quan-li-dia-diem.component';

describe('QuanLiDiaDiemComponent', () => {
  let component: QuanLiDiaDiemComponent;
  let fixture: ComponentFixture<QuanLiDiaDiemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLiDiaDiemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiDiaDiemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
