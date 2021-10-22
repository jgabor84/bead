import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, Subscription } from 'rxjs';
import { delay } from 'rxjs/operators';
import {TokenStorageService} from './token-storage.service';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  tokenSubscription = new Subscription()
  timeout: any;
  
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post('/api/login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string, role:string): Observable<any> {
    return this.http.post( '/api/new-user', {
      username,
      email,
      password,
      role
    }, httpOptions);
  }

  expirationCounter(timeout:any) {
    this.tokenSubscription.unsubscribe();
    this.tokenSubscription = of(null).pipe(delay(timeout)).subscribe((expired) => {
      console.log('EXPIRED!!');

      this.logout();
      alert("lejárt!");
    });
  }
    
    logout() {
    this.tokenSubscription.unsubscribe();

    sessionStorage.clear();
  }
}