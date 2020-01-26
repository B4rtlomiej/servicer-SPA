import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {
  baseUrl = environment.apiUrl;

constructor(private http: HttpClient) { }

  getReports(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + 'reports/');
  }
}
