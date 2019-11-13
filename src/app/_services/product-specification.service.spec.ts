/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ProductSpecificationService } from './product-specification.service';

describe('Service: ProductSpecificationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductSpecificationService]
    });
  });

  it('should ...', inject([ProductSpecificationService], (service: ProductSpecificationService) => {
    expect(service).toBeTruthy();
  }));
});
