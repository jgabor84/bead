import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { Wine } from '../models/wine.model';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../models/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-get-wine',
  templateUrl: './get-wine.component.html',
  styleUrls: ['./get-wine.component.css']
})
export class GetWineComponent implements OnInit {
  wine: Wine;
  isLoggedIn = false;
  userid = null;
  constructor(
    private userService: UserService, 
    private cartService: CartService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private tokenStorage: TokenStorageService    
    ) { }

    getDecodedAccessToken(token: string): any {
      try{
          return jwt_decode(token);
      }
      catch(Error){
          return null;
      }
    }

  async ngOnInit(): Promise <void> {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      let tokenInfo = this.getDecodedAccessToken(this.tokenStorage.getUser().token);
      this.userid = tokenInfo.userId;
      console.log(JSON.stringify(tokenInfo));
    }



    const id = this.activatedRoute.snapshot.params.id;
    await this.userService
    .getWineById(id)
    .then((data: Wine) => {
      this.wine = data;
      console.log('wines: '+JSON.stringify(this.wine));
      
    });
  }

}
