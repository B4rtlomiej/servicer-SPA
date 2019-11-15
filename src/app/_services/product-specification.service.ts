import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ProductSpecification } from '../_models/productSpecification';
import { PaginatedResult } from '../_models/pagination';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductSpecificationService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getProductSpecifications(page?,itemsPerPage?,productParams?): Observable<PaginatedResult<ProductSpecification[]>> {
    const paginatedResult: PaginatedResult<ProductSpecification[]> = new PaginatedResult<ProductSpecification[]>();

    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }
    if (productParams != null && productParams.isActive !=null && productParams.isActive !==undefined) {
      params = params.append('isActive', productParams.isActive);
    }
    if (productParams != null && productParams.column !=null && productParams.column !==undefined) {
      params = params.append('column', productParams.column);
    }
    if (productParams != null && productParams.sorting !=null && productParams.sorting !==undefined) {
        params = params.append('sorting', productParams.sorting);
    }
    return this.http
      .get<ProductSpecification[]>(this.baseUrl + 'productspecifications', { observe: 'response', params })
      .pipe(
        map(response => {
          paginatedResult.result = response.body;
          if (response.headers.get('Pagination') != null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }
          return paginatedResult;
        })
      );
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
