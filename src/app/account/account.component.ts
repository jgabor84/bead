import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../services/account.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../models/account.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  constructor(
    private accountService: AccountService, 
    private activatedRoute: ActivatedRoute
    ) { }

  async ngOnInit(): Promise<void> {
    const id = this.activatedRoute.snapshot.params.id;
    try {
      console.log("param " +id);
      await this.accountService.getClientAccount(id).then((data: Account[]) => {
       
       this.accounts = data;
      // this.allUsers = this.users;
       
     });
       
       console.log(this.accounts);
     } catch (err) {
       console.error(err);
     }

  }

}
