import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { Wine } from '../../models/wine.model';

@Component({
  selector: 'app-list-wine',
  templateUrl: './list-wine.component.html',
  styleUrls: ['./list-wine.component.css']
})
export class ListWineComponent implements OnInit {
  wines: Wine[];
  filterWines: Wine[];
  avgRating:any;

  constructor(private userService: UserService, private cartService: CartService) { }

 async ngOnInit(): Promise<void> {

    await this.userService
    .getAvgRating(4)
    .then((data: number) => {
      this.avgRating = data;
      console.log('avgrating: '+this.avgRating.avg);
      
    });


    await this.userService
    .listWine()
    .then((data: Wine[]) => {
      this.wines = data;
      this.filterWines = [...this.wines]
      
      
    });
  }
  async search(value: string)  {
    this.filterWines = [...this.wines];
      this.wines, this.filterWines = this.filterWines.filter(
        (val) =>
          val.color.toString().toLowerCase().includes(value) ||
          val.type.toString().toLowerCase().includes(value)
      );
      
    }
    async searchDiscount(){
      this.filterWines = [...this.wines];
      this.wines, this.filterWines = this.filterWines.filter(
        (val) =>
          val.discount>0
      );
      
    }


  addToCart(wine:Wine): void {
     this.cartService.event.emit(wine);  
    
  }
 

}
