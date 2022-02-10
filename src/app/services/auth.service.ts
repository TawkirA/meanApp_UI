import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserDetails, TokenResponse, TokenPayload } from '../models/user.model';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private tokenVal = '';

  constructor(private http: HttpClient, private router: Router) { }

  private saveToken(token: string): void {
    localStorage.setItem('mean-token', token);
    this.tokenVal = token;
  }

  private getToken(): string {
    if (!this.tokenVal) {
      this.tokenVal = localStorage.getItem("mean-token") || "";
    }

    return this.tokenVal;
  }

  public logout(): void {
    this.tokenVal = "";
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl("/");
  }

  public getUserDetails(): UserDetails | null {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  private request(
    method: "post" | "get",
    type: "login" | "register" | "profile",
    user?: TokenPayload
  ): Observable<any> {
    let base$;

    if (method === 'post') {
      base$ = this.http.post(`http://localhost:3000/api/${type}`, user);
    }else {
      base$ = this.http.get(`http://localhost:3000/api/${type}`, {
        headers: { Authorization: `Bearer ${this.getToken()}` }
      });
    }

    const request = base$.pipe(
      map((data: any) => {
        if (data.token) {
          this.saveToken(data.token);
        }
        return data;
      })
    );

    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request("post", "register", user);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request("post", "login", user);
  }

  public getProfile(): Observable<any> {
    return this.request("get", "profile");
  }
}
