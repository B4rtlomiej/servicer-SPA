import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../_models/person';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getPersons(page?, itemsPerPage?, personParams?): Observable<PaginatedResult<Person[]>> {
    const paginatedResult: PaginatedResult<Person[]> = new PaginatedResult<Person[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if(personParams && personParams.column){
      params = params.append('column', personParams.column);
    }
    
    if (personParams && personParams.sorting) {
      params = params.append('sorting', personParams.sorting);
  }

    return this.http
      .get<Person[]>(this.baseUrl + 'persons', { observe: 'response', params })
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

  getPerson(id: number): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + 'persons/' + id);
  }

  updatePerson(person: Person) {
    return this.http.put(this.baseUrl + 'persons/' + person.id, person);
  }
}