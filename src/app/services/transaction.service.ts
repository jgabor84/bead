import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../models/transaction.model';
import { Transactions } from '../models/transactions.model';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(private http: HttpClient) { }

  addTransaction(transaction: Transaction): Promise<Transaction> {
    return this.http.post<Transaction>('/api/transaction', transaction).toPromise();
  }

  getTransactions(): Promise<Transactions[]> {
    return this.http.get<Transactions[]>('/api/transactions').toPromise();
  }
  getAccTransactions(id:string): Promise<Transactions[]> {
    return this.http.get<Transactions[]>('/api/report/' + id).toPromise();
  }

}
