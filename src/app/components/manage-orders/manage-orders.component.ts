import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { OrderService } from '../../services/order.service';
import { CartService } from 'src/app/services/cart.service';
import { Order } from '../../models/order.model';
import { CartItem } from 'src/app/models/cart-item.model';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-manage-orders',
  templateUrl: './manage-orders.component.html',
  styleUrls: ['./manage-orders.component.css']
})
export class ManageOrdersComponent implements OnInit {

  order: any;
  cartItem: any;

  constructor(private orderServive: OrderService, private cartService: CartService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.orderServive.getOrders().then((data:Order[])=>{this.order=data; console.log("manage: "+JSON.stringify(this.order))})
  }

  getCartItems(cartId:any, content:any):void{
    this.modalService.open(content);
    this.cartService.getCartItem(cartId).then((item:CartItem[]) => 
    {
      this.cartItem = item
      console.log("catitem: "+JSON.stringify(this.cartItem));
    }
    );
    
  
  }

}
