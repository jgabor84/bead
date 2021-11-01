import { Component, OnInit  } from '@angular/core';
import { GuardService } from './services/guard.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Winez webshop';
  cartIsOpen=false;
  isLoggedIn=false;
  userId = 0;
  username = '';
  roles = [];

  constructor(private auth: GuardService, private authService: AuthService ) {}

  ngOnInit(): void {
   if(this.auth.isLoggedIn()){this.isLoggedIn = true;}
  this.userId = this.auth.getUserInfo().userId;
  this.username = this.auth.getUserInfo().username;
  this.roles = this.auth.getUserInfo().roles;
  console.log("role: "+this.roles);
  window.addEventListener("beforeunload", () => localStorage.removeItem('items'));
  }
 
  async logout() {

    this.authService.logout();
    this.reloadPage();
  }
  reloadPage(): void {
    window.location.reload();
  }

  openCart(){
    this.cartIsOpen == false ? this.cartIsOpen = true :this.cartIsOpen = false;
  }

}
