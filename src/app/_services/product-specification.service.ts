import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductSpecification } from '../_models/productSpecification';

@Injectable({
  providedIn: 'root'
})
export class ProductSpecificationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductSpecifications(): Observable<ProductSpecification[]> {
    return this.http.get<ProductSpecification[]>(this.baseUrl + 'productspecifications');
  }

  upsertProductSpecification(productSpecification: ProductSpecification) {
    if (productSpecification.id) {
      return this.http.put(this.baseUrl + 'productspecifications/' + productSpecification.id, productSpecification);
    } else {
      return this.http.post(this.baseUrl + 'productspecifications', productSpecification);
    }
  }

  changeIsActive(productSpecificationId: number) {
    return this.http.put(this.baseUrl + 'productspecifications/' + productSpecificationId + '/changeisactive', {});
  }
}
