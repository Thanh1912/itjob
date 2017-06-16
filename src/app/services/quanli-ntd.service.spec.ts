import { TestBed, inject } from '@angular/core/testing';

import { QuanliNtdService } from './quanli-ntd.service';

describe('QuanliNtdService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuanliNtdService]
    });
  });

  it('should ...', inject([QuanliNtdService], (service: QuanliNtdService) => {
    expect(service).toBeTruthy();
  }));
});
