import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomalanguageComponent } from './diplomalanguage.component';

describe('DiplomalanguageComponent', () => {
  let component: DiplomalanguageComponent;
  let fixture: ComponentFixture<DiplomalanguageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomalanguageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomalanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
