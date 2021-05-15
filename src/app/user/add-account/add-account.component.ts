import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-add-account',
  templateUrl: './add-account.component.html',
  styleUrls: ['./add-account.component.css']
})
export class AddAccountComponent implements OnInit {

  @Input() clnumber: number;

  errorMessage: string;
  successMessage: string;
  accNumber: any;

  accForm: FormGroup = this.formBuilder.group({
    acc_balance: [0],
    
  });

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }

  open(content:any) {
    this.modalService.open(content);
  }

  ngOnInit(): void {
  }

  
  async addAccount() {

    
    
    

    try {
    this.accNumber = await this.accountService.getAccNumber(this.clnumber);
 

  const account = {
    acc_number: this.accNumber,
    acc_balance: this.accForm.get('acc_balance')!.value,
    acc_status: true,
    owner: this.clnumber
  }
  const transaction = {
    tr_id: 0,
    tr_opp_acc: this.accNumber,
    tr_amount: this.accForm.get('acc_balance')!.value,
    tr_comment: 'Opening transaction',
    tr_date: '',
    account: 'Pénztár'
  }

  
      

      this.errorMessage = '';
      this.successMessage = '';

     // console.log("transaction: "+transaction.account);
     console.log("trans:" , transaction.account);
     console.log("account:" , account.acc_number);
      
      await this.accountService.addAccount(account);
      await this.transactionService.addTransaction(transaction);
      await this.router.navigateByUrl('/client-accounts/'+account.owner);
      this.modalService.dismissAll();
      
    } catch (err) {
      this.errorMessage = err.error.message;
    }
    
  }


}
