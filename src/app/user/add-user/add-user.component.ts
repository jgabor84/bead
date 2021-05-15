import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  errorMessage: string;
  successMessage: string;

  userForm: FormGroup = this.formBuilder.group({
    cl_number: [0],
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

  open(content:any) {
    this.modalService.open(content);
  }

 async ngOnInit() {
    const id = this.activatedRoute.snapshot.queryParams.id;

    if (id) {
      console.log(id);
      const user = await this.userService.getUserById(id);
      console.log("userid "+user);
      this.userForm.setValue(user);
    }
  }

  async saveUser() {
    const user = this.userForm.value;

    try {
      this.errorMessage = '';
      this.successMessage = '';
      await this.userService.saveUser(user);
      this.router.navigateByUrl('/users');
      this.modalService.dismissAll();
      
    } catch (err) {
      this.errorMessage = err.error.message;
    }
    
  }

}
