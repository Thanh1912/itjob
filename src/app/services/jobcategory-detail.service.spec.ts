import { TestBed, inject } from '@angular/core/testing';

import { JobcategoryDetailService } from './jobcategory-detail.service';

describe('JobcategoryDetailService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JobcategoryDetailService]
    });
  });

  it('should be created', inject([JobcategoryDetailService], (service: JobcategoryDetailService) => {
    expect(service).toBeTruthy();
  }));
});
