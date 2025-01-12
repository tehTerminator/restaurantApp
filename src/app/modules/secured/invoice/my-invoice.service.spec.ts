/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MyInvoiceService } from './my-invoice.service';

describe('Service: MyInvoice', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MyInvoiceService]
    });
  });

  it('should ...', inject([MyInvoiceService], (service: MyInvoiceService) => {
    expect(service).toBeTruthy();
  }));
});
