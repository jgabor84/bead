import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';


const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }
  timeout:any;

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string): void {
    console.log("storage: "+token);
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);

  }

  public getToken(): string | null {
    let ust = window.sessionStorage.getItem(TOKEN_KEY);
    console.log("ust :"+ust);
   // return JSON.parse(window.sessionStorage.getItem(TOKEN_KEY)!);
   return window.sessionStorage.getItem(TOKEN_KEY);
    
  }

  public saveUser(user: any): void {
    console.log("save: "+JSON.stringify(user));
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
    
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return {};
  }
}