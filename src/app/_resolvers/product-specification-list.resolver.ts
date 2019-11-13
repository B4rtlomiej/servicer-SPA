import { Injectable } from '@angular/core';
import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';
import { ToastrService } from '../_services/toastr.service';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ProductSpecification } from '../_models/productSpecification';
import { ProductSpecificationService } from '../_services/product-specification.service';

@Injectable()
export class ProductSpecificationListResolver implements Resolve<ProductSpecification[]> {

  constructor(private productSpecificationService: ProductSpecificationService, private router: Router, private toastr: ToastrService) { }

  resolve(route: ActivatedRouteSnapshot): Observable<ProductSpecification[]> {
    return this.productSpecificationService.getProductSpecifications().pipe(
      catchError(error => {
        this.toastr.error(error);
        this.router.navigate(['/']);
        return of(null);
      })
    );
  }
}
