import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-board-admin',
  templateUrl: './board-admin.component.html',
  styleUrls: ['./board-admin.component.css']
})
export class BoardAdminComponent implements OnInit {
  content?: string;
  isLoggedIn = false;
  username?: string;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  topRating: number;

  constructor(private userService: UserService, private authService: AuthService, private tokenStorage: TokenStorageService) { }
  getDecodedAccessToken(token: string): any {
    try{
        return jwt_decode(token);
    }
    catch(Error){
        return null;
    }
  }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
      let tokenInfo = this.getDecodedAccessToken(this.tokenStorage.getUser().token);
      this.username = tokenInfo.username;
      
    }

    
    this.userService.getAdminBoard().subscribe(
      data => {
        this.content = data;
        
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}