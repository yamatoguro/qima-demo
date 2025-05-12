import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  url = environment.baseUrl + '/login';

  login(credentials: any) {
    const headers = new HttpHeaders({
      Authorization:
        'Basic ' + btoa(credentials.username + ':' + credentials.password),
    });
    return this.http.get(this.url, { headers }); // Adjust the endpoint as needed
  }
}
