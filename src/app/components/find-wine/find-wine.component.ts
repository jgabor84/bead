import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Wine } from '../../models/wine.model';



@Component({
  selector: 'app-find-wine',
  templateUrl: './find-wine.component.html',
  styleUrls: ['./find-wine.component.css']
})
export class FindWineComponent implements OnInit {
  wines!: Wine[];




selectedWine = null;

  constructor(private builder: FormBuilder, private userService: UserService) { }

  async ngOnInit(): Promise<void> {

     await this.userService
    .listWine()
    .then((data: Wine[]) => {
      this.wines = data;
      
      
    });
  }
 

}
