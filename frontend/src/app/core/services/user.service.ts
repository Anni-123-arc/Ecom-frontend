import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = 'https://ecom-backend-ak0w.onrender.com/api';

  constructor(private http: HttpClient) {}

  // ✅ Matches backend route: GET /users/me
  getProfile(): Observable<{ user: any }> {
    return this.http.get<{ user: any }>(`${this.baseUrl}/users/me`);
  }

  // ✅ Matches backend route: PUT /users/me
  updateProfile(data: any): Observable<{ user: any }> {
    return this.http.put<{ user: any }>(`${this.baseUrl}/users/me`, data);
  }

  // Address CRUD
  getAddresses(): Observable<any> {
    return this.http.get(`${this.baseUrl}/addresses`);
  }

  addAddress(data: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/addresses`, data);
  }

  updateAddress(id: string, data: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/addresses/${id}`, data);
  }

  deleteAddress(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/addresses/${id}`);
  }
}
