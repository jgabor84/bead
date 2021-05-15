import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

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
  
}
