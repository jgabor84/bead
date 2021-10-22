import { Component, OnInit  } from '@angular/core';
import { GuardService } from './services/guard.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Banki ügyintézés';
  cartIsOpen=false;
  isLoggedIn=false;
  userId = 0;
  username = '';
  roles = [];

  constructor(private auth: GuardService) {}

  ngOnInit(): void {
   if(this.auth.isLoggedIn()){this.isLoggedIn = true;}
  this.userId = this.auth.getUserInfo().userId;
  this.username = this.auth.getUserInfo().username;
  this.roles = this.auth.getUserInfo().roles;
  console.log("role: "+this.roles);
  window.addEventListener("beforeunload", () => localStorage.removeItem('items'));
  }
 


  openCart(){
    this.cartIsOpen == false ? this.cartIsOpen = true :this.cartIsOpen = false;
  }

}
