import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompanysizeComponent } from './companysize.component';

describe('CompanysizeComponent', () => {
  let component: CompanysizeComponent;
  let fixture: ComponentFixture<CompanysizeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompanysizeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompanysizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
