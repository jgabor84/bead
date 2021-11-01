import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  user: User;
  userId:number;

  
  errorMessage: string;
  successMessage: string;
  isSuccessful: boolean;
  isSignUpFailed: boolean;
  

  userForm: FormGroup = this.formBuilder.group({
   // cl_number: [{value: 0, disabled: true}],
    firstName: null,
    middleName: null,
    lastName: null,
    tel:null,
    postcode: null,
    city: null,
    address:null
  });

  constructor( 
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private authService :AuthService,
    private router: Router,) { }

  async ngOnInit(): Promise<void> {
    this.userId = this.activatedRoute.snapshot.params.id;
    this.user = await this.userService.getUserById(this.userId);
    this.userForm.patchValue(this.user);
  }

  async updateUser(): Promise<void>{
    this.user.firstName = this.userForm.controls['firstName'].value;
    this.user.middleName = this.userForm.controls['middleName'].value;
    this.user.lastName = this.userForm.controls['lastName'].value;
    this.user.tel = this.userForm.controls['tel'].value;
    this.user.postcode = this.userForm.controls['postcode'].value;
    this.user.city = this.userForm.controls['city'].value;
    this.user.address = this.userForm.controls['address'].value;
    
    
    try {
      this.errorMessage = '';
      this.successMessage = 'Sikeres frissítés';
      console.log("update user: ",this.user);
      await this.userService.updateUser(this.user);

    } catch (err) {
      (      err: { error: { message: string; }; }) => {
        this.errorMessage = err.error.message;
        
      }
    }

   
  }



  

}
