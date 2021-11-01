import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { CartService } from '../../services/cart.service';
import { Carousel } from '../../models/carousel.model';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  
  carousel : Carousel[];
  topRate: number;
  wineName: string;
  wineImg: any;
  wineWinery: string;
  wineYear: any;
  winePrice: any;
  wineId: any;
  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.userService
    .getCarousel()
    .then((data: Carousel[]) => {
      this.carousel = data;
      console.log('carousel: '+this.carousel);
      
    });
    await this.userService
    .getTopRating()
    .then((data: any) => {
      this.topRate = data.maxrate;
      this.wineId = data.wine_id;
      this.wineImg = data.wine_imgs;
      this.wineName = data.wine_name;
      this.wineWinery = data.wine_winery;
      this.winePrice = data.wine_price;
      
    });

  }

}
