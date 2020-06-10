import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient) {}

  register(
    email: User['email'],
    displayName: User['displayName'],
    password: User['password']
  ) {
    return this.http
      .post<User>(`${environment.api}/user`, {
        email,
        displayName,
        password,
      })
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
}
