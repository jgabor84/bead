import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Wine } from '../models/wine.model';
import { Review } from '../models/review.model';
import { Cart } from '../models/cart.model';
import { CartItem } from '../models/cart-item.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  

  constructor(private http: HttpClient) {
    
   }
  @Output() event = new EventEmitter();

  saveCart(cart: Cart): Promise<Cart> {
    return this.http.post<Cart>('/api/save-cart', cart).toPromise();
  }
  addCartItem(cartItem: CartItem[]): Promise<CartItem[]> {
    return this.http.post<CartItem[]>('/api/add-cart-item', cartItem).toPromise();
  }

  getCart(id:number): Promise<Cart> {
    return this.http.get<Cart>('/api/carts/' + id).toPromise();
  }
  getCartItem(id:number): Promise<CartItem[]> {
    return this.http.get<CartItem[]>('/api/cart-item/' + id).toPromise();
  }
  deleteCartItem(id: number) {
    return this.http.delete('/api/cart-item/' + id).toPromise();
  }

  getWineById(id:number): Promise<Wine> {
    return this.http.get<Wine>('/api/wines/' + id).toPromise();
  }
 


}
