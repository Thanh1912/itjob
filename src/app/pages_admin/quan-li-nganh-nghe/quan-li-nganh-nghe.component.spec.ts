import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuanLiNganhNgheComponent } from './quan-li-nganh-nghe.component';

describe('QuanLiNganhNgheComponent', () => {
  let component: QuanLiNganhNgheComponent;
  let fixture: ComponentFixture<QuanLiNganhNgheComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuanLiNganhNgheComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuanLiNganhNgheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
