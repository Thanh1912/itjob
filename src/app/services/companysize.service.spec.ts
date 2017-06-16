import { TestBed, inject } from '@angular/core/testing';

import { CompanysizeService } from './companysize.service';

describe('CompanysizeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CompanysizeService]
    });
  });

  it('should ...', inject([CompanysizeService], (service: CompanysizeService) => {
    expect(service).toBeTruthy();
  }));
});
