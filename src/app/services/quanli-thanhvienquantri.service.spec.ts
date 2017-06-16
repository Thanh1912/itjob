import { TestBed, inject } from '@angular/core/testing';

import { QuanliThanhvienquantriService } from './quanli-thanhvienquantri.service';

describe('QuanliThanhvienquantriService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QuanliThanhvienquantriService]
    });
  });

  it('should ...', inject([QuanliThanhvienquantriService], (service: QuanliThanhvienquantriService) => {
    expect(service).toBeTruthy();
  }));
});
