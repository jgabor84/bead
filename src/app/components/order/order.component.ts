import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Wine } from '../../models/wine.model';
import { CartItem } from '../../models/cart-item.model';
import { Cart } from '../../models/cart.model';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../models/user.model';
import { Order } from 'src/app/models/order.model';
import { TokenStorageService } from '../../services/token-storage.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  errorMessage:string;
  successMessage:string;

  cartProducts: CartItem[] = [];
  cartProduct: CartItem[] = [];
  fullCart:any;
  userid:any;
  cartId:any;
  wine:Wine;
  user:User;
  cart:any;
  sendCart:any;
  totalQuantity: number;
  price: number;
  totalPrice: number;
  isLoggedIn = false;

  userForm: FormGroup = this.formBuilder.group({
    // cl_number: [{value: 0, disabled: true}],
    invoice_firstName: null,
    invoice_middleName: null,
    invoice_lastName: null,
    invoice_tel:null,
    invoice_postcode: null,
    invoice_city: null,
    invoice_address:null
   });

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    private userService: UserService, 
    private cartService: CartService, 
    private tokenStorage: TokenStorageService) { }

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
      
      
      this.userService.getUserById(this.userid).then(res => {
        this.user = res;
        this.userForm.patchValue(this.user);

      this.userForm.controls['invoice_firstName'].setValue(this.user.firstName);
     this.userForm.controls['invoice_middleName'].setValue(this.user.middleName);
     this.userForm.controls['invoice_lastName'].setValue(this.user.lastName);
     this.userForm.controls['invoice_tel'].setValue(this.user.tel);
    this.userForm.controls['invoice_postcode'].setValue(this.user.postcode);
     this.userForm.controls['invoice_city'].setValue(this.user.city);
    this.userForm.controls['invoice_address'].setValue(this.user.address);

      });
      
     

      this.cartService.getCart(this.userid).then((res) => {
      this.cart = res;
      this.sendCart = res;
    
      this.cartId = this.cart.id;

      this.cartService.getCartItem(this.cartId).then(res =>{
           this.cartProducts = res;
        
        
      })
      
      });
      
    }
    }
    async saveOrder(): Promise<void>{
      const order = this.userForm.getRawValue();
      order.status = "Rendelve"
      order.user = this.userid;
      order.cart = this.cartId;
      order.createdAt = new Date();
      
      
      try {
        this.errorMessage = '';
        this.successMessage = 'Sikeres frissítés';
        console.log("update user: ",this.user);
        await this.orderService.saveOrder(order);
  
      } catch (err) {
        (      err: { error: { message: string; }; }) => {
          this.errorMessage = err.error.message;
          
        }
      }
  
     
    }

}
