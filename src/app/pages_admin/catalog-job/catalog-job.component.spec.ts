import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogJobComponent } from './catalog-job.component';

describe('CatalogJobComponent', () => {
  let component: CatalogJobComponent;
  let fixture: ComponentFixture<CatalogJobComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CatalogJobComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CatalogJobComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
