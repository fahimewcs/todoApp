import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {

  private baseUrl = "http://localhost:3000/users";

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    return this.http.post(this.baseUrl, user);
  }

  // check duplicate email
  getUserByEmail(email: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}?email=${email}`);
  }

  getUserById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

}


