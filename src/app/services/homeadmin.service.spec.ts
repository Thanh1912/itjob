import { TestBed, inject } from '@angular/core/testing';

import { HomeadminService } from './homeadmin.service';

describe('HomeadminService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HomeadminService]
    });
  });

  it('should ...', inject([HomeadminService], (service: HomeadminService) => {
    expect(service).toBeTruthy();
  }));
});
