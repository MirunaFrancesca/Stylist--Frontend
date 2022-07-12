import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, from, Observable} from "rxjs";
import {map, switchMap, tap} from "rxjs/operators";
import {Storage} from "@capacitor/storage";
import { LoginRequest } from './model/loginRequest';
import { JwtToken } from './model/jwtToken';
import { User } from './model/user';

export const TOKEN_KEY = 'login-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  token = '';

  private backendUrl = 'http://192.168.43.121:8080/auth';
  private headerDict = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': '*',
    'Access-Control-Allow-Origin': '*'
  };

  private requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private httpClient: HttpClient) {
    this.loadToken();
  }

  registerUser(newUser: User): Observable<User>{
    return this.httpClient.post<User>(
      this.backendUrl + '/register', newUser, this.requestOptions
    );
  }

  checkToken(token: string): Observable<boolean> {
    return this.httpClient.get<boolean>(
      this.backendUrl + `/checkToken?token=${token}`, this.requestOptions);
  }

  async loadToken(){
    const token = await Storage.get({key: TOKEN_KEY});
    // Storage.remove({key: TOKEN_KEY});
    if(token && token.value) {
      this.checkToken(token.value).subscribe((res) => {
        console.log(res);
        if(res) {
          this.token = token.value;
          this.isAuthenticated.next(true);
        }
        else {
          Storage.remove({key: TOKEN_KEY});
          this.isAuthenticated.next(false);
          console.log(token);
          console.log("token expired");
        }
      })
    } 
    else {
      Storage.remove({key: TOKEN_KEY});
      this.isAuthenticated.next(false);
    }
  }

  loginUser(username: string, password: string): Observable<any>{
    const loginReq = new LoginRequest(username, password);

    return this.httpClient.post<any>(
      this.backendUrl + '/login', loginReq, this.requestOptions,
    ).pipe(
      map((loginResponse: JwtToken) => loginResponse.jwtToken),
      switchMap(
        token => {
          return from(Storage.set({key: TOKEN_KEY, value: token}));
        }
      ),
      tap(_ => {
        this.isAuthenticated.next(true);
      })
    );
  }

  logoutUser(): Promise<void>{
    this.isAuthenticated.next(false);
    return Storage.remove({key: TOKEN_KEY});
  }
}