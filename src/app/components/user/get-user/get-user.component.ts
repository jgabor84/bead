import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {
  users: User[];
  cl_number: number;

  constructor(private userService: UserService) { }

  async ngOnInit(): Promise<void> {
    try {
      this.users = await this.userService.getUsers();
      console.log(this.users);
    } catch (err) {
      console.error(err);
    }
  }

  deleteUser(user:User){
alert('delete');
  }



  addUser(){
    alert('add');
      }

}
