import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Carousel } from '../../models/carousel.model';
import { DropEvent } from 'ng-drag-drop';


@Component({
  selector: 'app-edit-carousel',
  templateUrl: './edit-carousel.component.html',
  styleUrls: ['./edit-carousel.component.css']
})
export class EditCarouselComponent implements OnInit {

  carousel : Carousel[];
  newData: Carousel[];
  carouselSave: Carousel;
  text:any[] = [];
  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    await this.userService
    .getCarousel()
    .then((data: Carousel[]) => {
      this.carousel = data;
      
      console.log('carousel: '+JSON.stringify(this.carousel));
      
    });
  }
  
 saveItem(id:any, index:any, text:any, img:any, link:any, active:any):void{
  
    const carousel = {
    id:id,
    text:text,
    img:img,
    active:active,
    link:link,
    position: index

    }
    this.userService.addCarousel(carousel);
    
 


   console.log(id+" - "+index+" - "+text);
   
 }

}
