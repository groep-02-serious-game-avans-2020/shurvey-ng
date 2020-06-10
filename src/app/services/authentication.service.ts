import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user';
import { environment } from '../../environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of, BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser'))
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  get currentUserValue() {
    return this.currentUserSubject.value;
  }

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

  login(email: User['email'], password: User['password']) {
    return this.http
      .post<any>(`${environment.api}/user/login`, { email, password })
      .pipe(
        map((data) => {
          console.log(data);
          localStorage.setItem('currentUser', JSON.stringify(data.token));
          this.currentUserSubject.next(data);
          return data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
}
