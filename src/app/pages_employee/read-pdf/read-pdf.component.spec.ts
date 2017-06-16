import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadPdfComponent } from './read-pdf.component';

describe('ReadPdfComponent', () => {
  let component: ReadPdfComponent;
  let fixture: ComponentFixture<ReadPdfComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadPdfComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadPdfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
