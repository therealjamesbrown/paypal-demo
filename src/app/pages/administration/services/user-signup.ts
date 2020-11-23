/**
 * 
 * ================================
 * ; Title: user admin service
 * ; Authors: Sarah Kovar; James Brown; Brendan Mulhern
 * ; Modified by: Brendan Mulhern
 * ; Date: 11/9/2020
 * ; Description: User Admin Service
 * ================================
 * 
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user.interface'
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class UserSignUpService {

  constructor(private http: HttpClient) { }
  getSecurityQuestions(): Observable<User[]> {
    return this.http.get<User[]>('/api/securityQuestions')
  }  
  postUsers(newUser): Observable<User> {
    return this.http.post<User>('/api/users', newUser)
  }
  signIn(data): Observable<User> {
    return this.http.post<User>('/api/session/signin', data)
  }
}
