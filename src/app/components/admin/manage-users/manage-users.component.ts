import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Wine } from '../../../models/wine.model';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users! : User[];
  selectedUser = null;
  errorMessage: string;
  successMessage: string;

  constructor(private builder: FormBuilder, private userService: UserService) { }

  async ngOnInit(): Promise<void> {

    await this.userService
   .getUsers()
   .then((data: User[]) => {
     this.users = data;
     console.log('wines: '+this.users);
     
   });
 }

 async delUser(id:any){
  try {
    this.errorMessage = '';
    this.successMessage = '';
    const deluser = {
      cl_number:id
      
    }
    await this.userService.deleteUser(deluser);
    
  } catch (err) {
    //this.errorMessage = err.error.message;
  }
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