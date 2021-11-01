import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { Wine } from '../../models/wine.model';

@Component({
  selector: 'app-wine-discount',
  templateUrl: './wine-discount.component.html',
  styleUrls: ['./wine-discount.component.css']
})
export class WineDiscountComponent implements OnInit {
  wines: Wine[];
  filterWines: Wine[];
  avgRating:any;

  constructor(private userService: UserService, private cartService: CartService) { }

  async ngOnInit(): Promise<void> {
    await this.userService
    .listWine()
    .then((data: Wine[]) => {
      this.wines = data;
      this.filterWines = [...this.wines];
      this.wines, this.filterWines = this.filterWines.filter(
        (val) =>
          val.discount>0
      );
      console.log('wines: '+this.wines);
      
    });
  }
  addToCart(wine:Wine): void {
    console.log("klikk wine: "+JSON.stringify(wine));
    this.cartService.event.emit(wine);  
    
  }

}
