import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  url = environment.baseUrl + '/auth';

  constructor(private http: HttpClient, private router: Router) {}

  register(userData: any) {
    return this.http.post(`${this.url}/register`, {
      name: userData.name,
      username: userData.username,
      password: userData.password,
      roles: userData.roles,
    });
  }

  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(`${this.url}/login`, {
      username: credentials.username,
      password: credentials.password,
    });
  }

  setToken(token: string) {
    localStorage.setItem('jwt', token);
  }

  getToken() {
    return localStorage.getItem('jwt');
  }

  logout() {
    localStorage.removeItem('jwt');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}
