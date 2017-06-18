import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DemocodeComponent } from './democode.component';

describe('DemocodeComponent', () => {
  let component: DemocodeComponent;
  let fixture: ComponentFixture<DemocodeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DemocodeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DemocodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
