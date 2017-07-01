import { TestBed, inject } from '@angular/core/testing';

import { JobcategoryService } from './jobcategory.service';

describe('JobcategoryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobcategoryService]
    });
  });

  it('should be created', inject([JobcategoryService], (service: JobcategoryService) => {
    expect(service).toBeTruthy();
  }));
});
