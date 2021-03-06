import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { PaginatedResult } from '../_models/pagination';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsers(page?, itemsPerPage?, userParams?): Observable<PaginatedResult<User[]>> {
    const paginatedResult: PaginatedResult<User[]> = new PaginatedResult<User[]>();

    let params = new HttpParams();

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page);
      params = params.append('pageSize', itemsPerPage);
    }

    if (userParams && userParams.userRole) {
      params = params.append('userRole', userParams.userRole);
    }

    if (userParams && userParams.isActive) {
      params = params.append('isActive', userParams.isActive);
    }

    if (userParams && userParams.orderBy) {
      params = params.append('orderBy', userParams.orderBy);
    }

    return this.http
      .get<User[]>(this.baseUrl + 'users', { observe: 'response', params })
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

  getUser(id: number): Observable<User> {
    return this.http.get<User>(this.baseUrl + 'users/' + id);
  }

  resetPassword(id: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/resetpassword', {
      token: localStorage.getItem('token')
    });
  }

  changeIsActive(id: number) {
    return this.http.post(this.baseUrl + 'users/' + id + '/changeisactive', { token: localStorage.getItem('token') });
  }

  updateUser(user: User) {
    return this.http.put(this.baseUrl + 'users/' + user.id, user);
  }
}