import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = environment.apiUrl + 'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model)
      .pipe(
        map((response: any) => {
          const user = response;
          if (user) {
            localStorage.setItem('token', user.token);
            this.decodedToken = this.jwtHelper.decodeToken(user.token);
          }
        })
      );
  }

  register(user: User) {
    return this.http.post(this.baseUrl + 'register/user', user);
  }

  setPassword(passwords: any) {
    return this.http.post(this.baseUrl + 'setpassword', passwords);
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }

  isAdmin() {
    return this.decodedToken.role === 'Admin';
  }

  getUserId() {
    return Number(this.decodedToken.nameid);
  }

  isOwner(userId: number) {
    return Number(this.decodedToken.nameid) === userId;
  }
}
