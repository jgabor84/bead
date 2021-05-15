import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Account } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  constructor(private http: HttpClient) { }

  getAccounts(): Promise<Account[]> {
    return this.http.get<Account[]>('/api/account').toPromise();
  }
  getClientAccount(id:number): Promise<Account[]> {
    return this.http.get<Account[]>('/api/client-accounts/' + id).toPromise();
  }
  getAccNumber(id:number): Promise<string> {
    return this.http.get<string>('/api/getaccid/' + id).toPromise();
  }
  
  getAccountById(id:string): Promise<Account> {
    return this.http.get<Account>('/api/account/' + id).toPromise();
  }

  addAccount(account: Account): Promise<Account> {
    return this.http.post<Account>('/api/account', account).toPromise();
  }
  updateBalance(account: Account): Promise<Account> {
    return this.http.put<Account>('/api/account', account).toPromise();
  }
}
