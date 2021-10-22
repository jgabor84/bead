import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../services/user.service';
import { Wine } from '../models/wine.model';
import { User } from 'backend/src/entity/User';


@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit {
  wines!: Wine[];


  cities = [
    {
        id: 1,
        name: 'Vilnius',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
    { id: 2, name: 'Kaunas', avatar: '//www.gravatar.com/avatar/ddac2aa63ce82315b513be9dc93336e5?d=retro&r=g&s=15' },
    {
        id: 3,
        name: 'Pavilnys',
        avatar: '//www.gravatar.com/avatar/6acb7abf486516ab7fb0a6efa372042b?d=retro&r=g&s=15'
    },
    {
        id: 4,
        name: 'Siauliai',
        avatar: '//www.gravatar.com/avatar/b0d8c6e5ea589e6fc3d3e08afb1873bb?d=retro&r=g&s=30 2x'
    },
];

selectedWine = null;

  constructor(private builder: FormBuilder, private userService: UserService) { }

  async ngOnInit(): Promise<void> {

     await this.userService
    .listWine()
    .then((data: Wine[]) => {
      this.wines = data;
      console.log('wines: '+this.wines);
      
    });
  }
 

}
