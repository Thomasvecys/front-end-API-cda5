import { Injectable } from '@angular/core';

import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { Utilisateur } from './utilisateur';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_URL: string = 'http://192.168.1.26:8080/Planning';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  currentUser = {};


  constructor(private httpClient: HttpClient,public router: Router) { }



  login(user: Utilisateur) {
    return this.httpClient.post<any>(`${this.API_URL}/rest/token`, user)
      .subscribe((res: any) => {
        localStorage.setItem('access_token', res.token)
        this.getUserProfile(res._id).subscribe((res) => {
          this.currentUser = res;
          this.router.navigate(['users/profile/' + res.msg._id]);
        })
      })
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    let authToken = localStorage.getItem('access_token');
    return (authToken !== null) ? true : false;
  }

  getUserProfile(id: any): Observable<any> {
    return this.httpClient.get(`${this.API_URL}/users/profile/${id}`, { headers: this.headers }).pipe(
      map((res: any) => {
        return res || {}
      }),
      catchError(this.handleError)
    )
  }

  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }


}
