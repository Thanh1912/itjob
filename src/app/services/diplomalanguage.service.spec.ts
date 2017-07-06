import { TestBed, inject } from '@angular/core/testing';

import { DiplomalanguageService } from './diplomalanguage.service';

describe('DiplomalanguageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DiplomalanguageService]
    });
  });

  it('should be created', inject([DiplomalanguageService], (service: DiplomalanguageService) => {
    expect(service).toBeTruthy();
  }));
});
