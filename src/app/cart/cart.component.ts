import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { CartService } from '../services/cart.service';
import { Wine } from '../models/wine.model';
import { CartItem } from '../models/cart-item.model';
import { Cart } from '../models/cart.model';
import { User } from '../models/user.model';
import { TokenStorageService } from '../services/token-storage.service';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  @Input() isOpen = false;


  cartProducts: CartItem[] = [];
  fullCart:any;
  userid:any;
  cartId:any;
  wine:Wine;
  user:User;
  cart:any;
  sendCart:Cart;
  totalQuantity: number;
  price: number;
  totalPrice: number;
  isLoggedIn = false;
  

  constructor(private userService: UserService, private cartService: CartService, private tokenStorage: TokenStorageService) { 
    //this.cartProducts = JSON.parse(localStorage.getItem('items') ||'[]');
  }
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
      let tokenInfo = this.getDecodedAccessToken(this.tokenStorage.getUser().token);
      this.userid = tokenInfo.userId;
      console.log(JSON.stringify(tokenInfo));
      this.userService.getUserById(this.userid).then(res => {
        this.user = res;
      })


      this.cartService.getCart(this.userid).then((res) => {
      this.cart = res;
      this.sendCart = res;
      this.cartId = this.cart.map((t: { id: any; }) => t.id);

      this.cartService.getCartItem(this.cartId[0]).then(res =>{
        console.log(this.cartId[0]);
        this.cartProducts = res;
        console.log("cp: "+JSON.stringify(this.cartProducts));
        //localStorage.setItem('items',JSON.stringify(this.cartProducts));
      })
      
      console.log("cid: "+JSON.stringify(res));
      console.log("cid "+this.cart.id);
      })


      

    }
// Hozzáadás kosárhoz
    this.cartService.event.subscribe(product => {
      this.wine = product;
      console.log("win: "+this.wine);
      let index = -1;
      index = this.cartProducts.findIndex(
        p => p.id === product.id
      );
      if (index != -1) {
        this.cartProducts[index].quantity += 1;
      } else if (index === -1) {


        const cartI = {
          id:0,
          sku: product.sku,
          price: product.price,
          discount: product.discount,
          quantity: 1,
          active: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          cart: this.sendCart,
          wine: this.wine

          
 };

        this.cartProducts.push(cartI);
      }
      this.sum();
      //localStorage.setItem('items',JSON.stringify(this.cartProducts));

      if(this.isLoggedIn){
        const cart = {
          id:0,
          status: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          user: this.user,
          cartItem: this.cartProducts
          
        }
        console.log(JSON.stringify(this.user));
        
        //kosár létrehozása
          if(Object.keys(this.sendCart).length === 0){
            console.log("ninss kosár");
            this.cartService.saveCart(cart).then(res => {
              this.sendCart = res;
              
              this.cartProducts.forEach( (value) => {
                value.cart = this.sendCart;
                
              });
             // this.cartProducts[2].cart = this.sendCart;
              this.cartService.addCartItem(this.cartProducts);
              
            })
  
          }
          // létező kosárhoz adás
          else{
            console.log("van kosár: "+JSON.stringify(this.sendCart));
              this.cartProducts.forEach( (value) => {
              value.cart = this.sendCart;
              
            });
            //this.cartProducts[2].cart = this.sendCart;
            console.log("kosárpr: "+JSON.stringify(this.cartProducts[2]));
            
            this.cartService.addCartItem(this.cartProducts);
          }
  
  
        
      }



    });
  }
  saveCart(){
    if(this.isLoggedIn){
      const cart = {
        id:0,
        status: true,
        createdAt: new Date(),
        updatedAt: new Date(),
        user: this.user,
        cartItem: this.cartProducts
        
      }
      console.log(JSON.stringify(this.user));
      
        if(!this.cart){
          this.cartService.saveCart(cart).then(res => {
            this.cart = res;
            
            this.cartProducts.forEach( (value) => {
              value.cart = this.cart;
              
            });
            this.cartService.addCartItem(this.cartProducts);
            
          })

        }
        else{
          console.log("getcart: "+JSON.stringify(this.cart));
          this.cartProducts.forEach( (value) => {
            value.cart = this.cart;
            
          });
          this.cartService.addCartItem(this.cartProducts);
        }


      
    }
  }


  sum(): void {
    this.totalQuantity = 0;
    this.price = 0;
    this.totalPrice = 0;
    if (this.cartProducts) {
      this.cartProducts.map(product => {
        this.totalQuantity += product.quantity;
        this.price += product.price;
        this.totalPrice += product.price;
      });
      // for (let i = 0; i < this.cartProducts.length; i++) {
      //   this.totalQuantity += this.cartProducts[i].product_quanity;
      //   this.price += this.cartProducts[i].product_price;
      //   this.totalPrice +=
      //     this.cartProducts[i].product_price * this.cartProducts[i].product_quanity;
      // }
    }
  }

  deleteProduct(id:any) {
    let index = this.cartProducts.findIndex(item => item.id === id);
    this.cartProducts.splice(index, 1);
    this.sum();
    console.log("del: "+id)
    this.cartService.deleteCartItem(id);
  }
}
