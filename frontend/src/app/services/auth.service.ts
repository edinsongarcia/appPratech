import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserInterface } from '../models/user';
import { JwtResponseInterface } from '../models/jwt-response';
import { tap } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';


@Injectable()
export class AuthService {
  AUTH_SERVER: string = 'http://localhost:3000';
  authSubject = new BehaviorSubject(false);
  private token: string;
  constructor(private httpClient: HttpClient, private router: Router) { }

  register(user: UserInterface): Observable<JwtResponseInterface> {
    return this.httpClient.post<JwtResponseInterface>(`${this.AUTH_SERVER}/register`,
      user).pipe(tap(
        (res: JwtResponseInterface) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  update(user: UserInterface): Observable<JwtResponseInterface> {
    return this.httpClient.post<JwtResponseInterface>(`${this.AUTH_SERVER}/edit`,
      user).pipe(tap(
        (res: JwtResponseInterface) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  login(user: UserInterface): Observable<JwtResponseInterface> {
    return this.httpClient.post<JwtResponseInterface>(`${this.AUTH_SERVER}/login`,
      user).pipe(tap(
        (res: JwtResponseInterface) => {
          if (res) {
            // guardar token
            this.saveToken(res.dataUser.accessToken, res.dataUser.expiresIn);
          }
        })
      );
  }

  logout(): void {
    this.token = '';
    localStorage.removeItem("ACCESS_TOKEN");
    localStorage.removeItem("EXPIRES_IN");
    this.router.navigateByUrl('auth/login');
  }

  getUsers(): Observable<UserInterface[]> {
    const url = `${this.AUTH_SERVER}/home`;
    return this.httpClient.get<UserInterface[]>(url);
  }

  sendUser(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.post<UserInterface>(`${this.AUTH_SERVER}/home`,
      user).pipe(tap(
        (res: UserInterface) => {
          if (res) {
            // guardar token
            console.log("todo bien");
          }
        })
      );
  }

  deleteUser(user: UserInterface): Observable<UserInterface> {
    return this.httpClient.put<UserInterface>(`${this.AUTH_SERVER}/home`,
      user).pipe(tap(
        (res: UserInterface) => {
          if (res) {
            // guardar token
            console.log("todo bien");
          }
        })
      );
  }


  private saveToken(token: string, expiresIn: string): void {
    localStorage.setItem("ACCESS_TOKEN", token);
    localStorage.setItem("EXPIRES_IN", expiresIn);
    this.token = token;
  }

  private getToken(): string {
    if (!this.token) {
      this.token = localStorage.getItem("ACCESS_TOKEN");
    }
    return this.token;
  }

}
