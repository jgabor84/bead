import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';
import jwt_decode from 'jwt-decode';

@Injectable()
export class GuardService implements CanActivate {
    id:number;
    username?: string;
    roles: string[] = [];

    constructor(private router: Router, private tokenStorage: TokenStorageService) { }

    getDecodedAccessToken(token: string): any {
        try{
            return jwt_decode(token);
        }
        catch(Error){
            return null;
        }
      }

      getUserInfo(){
        if (this.tokenStorage.getToken()) {
            
            this.roles = this.tokenStorage.getUser().roles;
            let tokenInfo = this.getDecodedAccessToken(this.tokenStorage.getUser().token);
            return tokenInfo;
          }
          else {return false;}
      }
      isAdmin(){
        let tokenInfo = this.getDecodedAccessToken(this.tokenStorage.getUser().token);
        if (sessionStorage.getItem('auth-user') &&  tokenInfo.roles == "ADMIN") {
            
            return true;
        }
        else {return false;}
      }

    isLoggedIn(){
        if (sessionStorage.getItem('auth-user')) {
           
            return true;
        }
        else {return false;}
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (sessionStorage.getItem('auth-user')) {
            // logged in so return true
            return true;
        }

        // not logged in so redirect to login page
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}
