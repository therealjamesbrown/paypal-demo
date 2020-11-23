/**
 * 
 * ================================
 * ; Title: user-creation service
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Brendan Mulhen
 * ; Date: 11/9/2020
 * ; Description: User Creation Service
 * ================================
 * 
 */
import { HttpClient} from '@angular/common/http'
import { Injectable } from '@angular/core';
import { User } from '../interfaces/user.interface'
import { Observable } from 'rxjs'
@Injectable({
  providedIn: 'root'
})
export class UserCreationService {

  constructor(private http: HttpClient) { }
  get(): Observable<User[]> {
    return this.http.get<User[]>('/api/users')
  }
  getUserById(id): Observable<User> {
    return this.http.get<User>(`/api/users/${id}`)
  }
  post(data): Observable<User> {
    return this.http.post<User>('/api/users', data)
  }
  put(id, data): Observable<User> {
    return this.http.put<User>(`/api/users/${id}`, data)
  }
  patch(id, data): Observable<User> {
    return this.http.patch<User>(`/api/users/${id}`, data)
  }

  getAllUserRoles(): Observable<any>{
    return this.http.get('/api/roles/');
  }
}
