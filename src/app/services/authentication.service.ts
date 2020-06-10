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

  register(user: Omit<User, '_id' | 'token'>) {
    return this.http
      .post<User>(`${environment.api}/user`, { user }) // Remove { }?
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  login(user: Pick<User, 'email' | 'password'>) {
    console.log(user);
    return this.http
      .post<any>(`${environment.api}/user/login`, user) // Remove { }?
      .pipe(
        map((data) => {
          console.log(data);
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.currentUserSubject.next(data);
          return data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }
}
