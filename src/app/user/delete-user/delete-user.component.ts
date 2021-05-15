import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../../services/user.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
  user: User;
  @Input() clnumber: number;

  errorMessage: string;
  successMessage: string;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
  }

  async deleteUser(clnumber:number, content:any): Promise<void>{
    this.modalService.open(content);
  }

  async delUser(){
    try {
      this.errorMessage = '';
      this.successMessage = '';
      const deluser = {
        cl_number:this.clnumber
        
      }
      console.log("update user: ",this.clnumber);
      await this.userService.deleteUser(deluser);
      this.router.navigateByUrl('/users');
      this.modalService.dismissAll();
      
    } catch (err) {
      this.errorMessage = err.error.message;
    }
  }

}
