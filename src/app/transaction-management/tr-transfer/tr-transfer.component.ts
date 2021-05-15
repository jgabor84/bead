import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Account } from '../../models/account.model';

@Component({
  selector: 'app-tr-transfer',
  templateUrl: './tr-transfer.component.html',
  styleUrls: ['./tr-transfer.component.css']
})
export class TrTransferComponent implements OnInit {

  accounts: Account[];
  balance: number;
  errorMessage: string;
  successMessage: string;

  acc1: any;
  acc2: any;

  accForm: FormGroup = this.formBuilder.group({
    tr_amount: [0],
    tr_account: [0]

  });

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) { }


  open(content: any) {
    this.modalService.open(content);
  }

  async getBalance(accNumber: string): Promise<number> {
    let accBalance = 0;
    try {
      console.log("param " + accNumber);
      await this.accountService.getAccountById(accNumber).then((data: Account) => {

        //this.balance = data.acc_balance;
        // this.allUsers = this.users;
        accBalance = data.acc_balance;

      });

      console.log(this.balance);
    } catch (err) {
      console.error(err);
    }
    console.log("getbalance: " + accBalance);
    return accBalance;
  }
  async addTransaction(accNumber1: string, accNumber2:string) {
    console.log("tr accnum: " + accNumber1);
    const accBalance1 = this.getBalance(accNumber1);
    const accBalance2 = this.getBalance(accNumber2);
    console.log("tr accbalance: " + await accBalance1);

    const transaction = {
      tr_id:0,
      tr_opp_acc: accNumber2,
      tr_amount: this.accForm.get('tr_amount')!.value,
      //tr_amount: this.accForm.get('acc_balance')!.value,
      tr_comment: 'Átutalás',
      tr_date: '',
      account: accNumber1
    }

    const account1 = {
      acc_number: accNumber1,
      acc_balance: await accBalance1 - parseFloat(this.accForm.get('tr_amount')!.value),
      acc_status: true

    }

    const account2 = {
      acc_number: accNumber2,
      acc_balance: await accBalance2 + parseFloat(this.accForm.get('tr_amount')!.value),
      acc_status: true

    }

    if (this.accForm.get('tr_amount')!.value < 0 ) {
      this.errorMessage = "Pozitív számot adjon meg";
      this.successMessage = "";
    }
    else if (await accBalance1 < (this.accForm.get('tr_amount')!.value)) {
      this.errorMessage = "Nincs fedezet! Egyenleg: " + await accBalance1;
      this.successMessage = "";
    } 
    else {
      this.successMessage = "Rendben";
      this.errorMessage = "";
      await this.transactionService.addTransaction(transaction);
      await this.accountService.updateBalance(account1);
      await this.accountService.updateBalance(account2);
    }


  }

  search: OperatorFunction<string, readonly Account[]> = (text$: Observable<string>) =>

    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.accounts.filter(v => v.acc_number.toString().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    );

  formatter = (x: { acc_number: any }) => x.acc_number;
  resFormatter = (x: { acc_number: any }) => x.acc_number;


  async ngOnInit(): Promise<void> {
    try {
      await this.accountService.getAccounts().then((data: Account[]) => {

        this.accounts = data;




      });

      console.log(this.accounts);
      console.log(this.acc1);
    } catch (err) {
      console.error(err);
    }
  }

}
