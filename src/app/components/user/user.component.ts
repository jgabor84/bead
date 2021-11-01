import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [DecimalPipe]
})
export class UserComponent implements OnInit {

  users: User[];
  allUsers: User[];
  cl_number: number;
  searchTerm: string;
  errorMessage:any;
  successMessage:any;


  constructor(
    private userService: UserService,
    pipe: DecimalPipe
    ) {}

  async ngOnInit(): Promise<void> {
    try {
     await this.userService.getUsers().then((data: User[]) => {
      
      this.users = data;
      this.allUsers = this.users;
      
    });
      
      console.log(this.users);
    } catch (err) {
      console.error(err);
    }
  }

  /* search(text: string, pipe: PipeTransform): User[] {
     console.log("search");
    return this.users.filter(user => {
      const term = text.toLowerCase();
      return user.cl_name.toLowerCase().includes(term)
          || pipe.transform(user.cl_address).includes(term)
          || pipe.transform(user.cl_tel).includes(term);
    });
  }*/
  search(value: string): void {
    this.users = this.allUsers.filter((val) => val.id.toString().includes(value) || 
    val.username.toLocaleLowerCase().includes(value));
    
  }

  async setAdmin(userid:any){

    try {
      this.errorMessage = '';
      this.successMessage = '';
  console.log(userid);
      await this.userService.setAdmin(userid);
      
    } catch (err) {
      //this.errorMessage = err.error.message;
    }
   
  
  
  }

 

}
