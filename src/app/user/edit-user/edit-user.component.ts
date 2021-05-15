import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  
  user: User;
  @Input() clnumber: number;

  errorMessage: string;
  successMessage: string;

  userForm: FormGroup = this.formBuilder.group({
    cl_number: [{value: 0, disabled: true}],
    cl_name: [''],
    cl_address: [''],
    cl_tel: [''],
    cl_uid: [''],
    cl_status:[true]
  });

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
    
    
    ) { }

    async ngOnInit(): Promise<void> {

    }

   async editUser(clnumber:number, content:any): Promise<void>{

    this.user = await this.userService.getUserById(clnumber);

    this.userForm.setValue(this.user);
    this.modalService.open(content);
    console.log("edit: "+this.user.cl_name);
      }

      async updateUser() {
        const user = this.userForm.getRawValue();
    
        try {
          this.errorMessage = '';
          this.successMessage = '';
          console.log("update user: ",user);
          await this.userService.updateUser(user);
          this.router.navigateByUrl('/users');
          this.modalService.dismissAll();
          
        } catch (err) {
          this.errorMessage = err.error.message;
        }
        
      }
  

}
