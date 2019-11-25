/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AdminModeService } from './admin-mode.service';

describe('Service: AdminMode', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AdminModeService]
    });
  });

  it('should ...', inject([AdminModeService], (service: AdminModeService) => {
    expect(service).toBeTruthy();
  }));
});