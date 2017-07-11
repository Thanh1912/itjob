import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailCandidateComponent } from './detail-candidate.component';

describe('DetailCandidateComponent', () => {
  let component: DetailCandidateComponent;
  let fixture: ComponentFixture<DetailCandidateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailCandidateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailCandidateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
