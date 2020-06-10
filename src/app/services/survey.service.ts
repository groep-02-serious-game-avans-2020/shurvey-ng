import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Survey } from '../models/survey';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SurveyService {
  constructor(private http: HttpClient) {}

  create(survey: Omit<Survey, '_id'>) {
    return this.http
      .post<Survey>(`${environment.api}/survey`, survey)
      .pipe(
        map((data) => {
          return data;
        }),
        catchError((error) => {
          return of(error);
        })
      );
  }

  getAll() {
    return this.http.get<Survey[]>(`${environment.api}/surveys`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  get(id: Survey['_id']) {
    return this.http.get<Survey>(`${environment.api}/survey/${id}`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }

  delete(id: Survey['_id']) {
    return this.http.delete<Survey>(`${environment.api}/survey/${id}`).pipe(
      map((data) => {
        return data;
      }),
      catchError((error) => {
        return of(error);
      })
    );
  }
}
