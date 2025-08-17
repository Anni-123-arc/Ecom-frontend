import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://ecom-backend-ak0w.onrender.com/api'; // Your backend base URL

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/register`, data);
  }

  login(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/login`, data);
  }

  forgotPassword(email: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/forgot-password`, { email });
  }

  resetPassword(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/reset-password`, data);
  }

  changePassword(data: { currentPassword: string; newPassword: string }): Observable<any> {
  return this.http.put(`${this.baseUrl}/auth/change-password`, data);
}


  //  Added logout method
  logout(): void {
    localStorage.removeItem('token'); // adjust token key if different
  }
}

