import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Order } from '../models/order.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient) { }

  saveOrder(order: Order): Promise<Order> {
    return this.http.post<Order>('/api/save-order', order).toPromise();
  }
  getOrders(): Promise<Order[]> {
    return this.http.get<Order[]>('/api/orders').toPromise();
  }
}
