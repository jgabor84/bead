import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { Wine } from '../models/wine.model';
import { Review } from '../models/review.model';
import { Carousel } from '../models/carousel.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }
  @Output() event = new EventEmitter();

  getUsers(): Promise<User[]> {
    return this.http.get<User[]>('/api/users').toPromise();
  }

  getUserById(id:number): Promise<User> {
    return this.http.get<User>('/api/users/' + id).toPromise();
  }

  saveUser(user: User): Promise<User> {
    return this.http.post<User>('/api/users', user).toPromise();
  }
  updateUser(user: User): Promise<User> {
    return this.http.put<User>('/api/users', user).toPromise();
  }
  deleteUser(id: any): Promise<User> {
    return this.http.put<User>('/api/delete-user', id).toPromise();
  }
  setAdmin(userid: any) {
    return this.http.post<any>('/api/set-admin', {userid}).toPromise();
  }

 
  getAdminBoard(): Observable<any> {
    return this.http.get('/api/admin', { responseType: 'text' });
  }
  addWine(wine: Wine): Promise<Wine> {
    return this.http.post<Wine>('/api/add-wine', wine).toPromise();
  }
  listWine(): Promise<Wine[]> {
    return this.http.get<Wine[]>('/api/wines').toPromise();
  }
  getWineById(id:number): Promise<Wine> {
    return this.http.get<Wine>('/api/wines/' + id).toPromise();
  }
  addReview(review: Review): Promise<Review> {
    return this.http.post<Review>('/api/add-review', review).toPromise();
  }
  getWineReviews(id:number): Promise<Review[]> {
    return this.http.get<Review[]>('/api/get-wine-review/' + id).toPromise();
  }
  getAvgRating(id:number): Promise<number> {
    return this.http.get<number>('/api/get-wine-ratings/' + id).toPromise();
  }

  getTopRating(): Promise<number> {
    return this.http.get<number>('/api/top-rating/').toPromise();
  }
  deleteCarousel(carousel: Carousel): Promise<Carousel> {
    return this.http.put<Carousel>('/api/delete-carousel', carousel).toPromise();
  }

  getMaxId() {
    return this.http.get<any>('/api/get-maxid');
  }
  addCarousel(carousel: Carousel): Promise<Carousel> {
    return this.http.post<Carousel>('/api/add-carousel', carousel).toPromise();
  }
  getCarousel(): Promise<Carousel[]> {
    return this.http.get<Carousel[]>('/api/get-carousel').toPromise();
  }
  
}
