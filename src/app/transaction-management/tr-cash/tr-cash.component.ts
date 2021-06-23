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
  selector: 'app-tr-cash',
  templateUrl: './tr-cash.component.html',
  styleUrls: ['./tr-cash.component.css'],
})
export class TrCashComponent implements OnInit {
  accounts: Account[];
  balance: number;
  errorMessage: string;
  successMessage: string;
  accNumber: any;

  accForm: FormGroup = this.formBuilder.group({
    tr_amount: [0],
    tr_account: [0],
  });

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {}

  open(content: any) {
    this.modalService.open(content);
  }

  async getBalance(accNumber: string): Promise<number> {
    let accBalance = 0;
    try {
      console.log('param ' + accNumber);
      await this.accountService
        .getAccountById(accNumber)
        .then((data: Account) => {
          //this.balance = data.acc_balance;
          // this.allUsers = this.users;
          accBalance = data.acc_balance;
        });

      console.log(this.balance);
    } catch (err) {
      console.error(err);
    }
    console.log('getbalance: ' + accBalance);
    return accBalance;
  }
  async addTransaction(accNumber: string) {
    console.log('tr accnum: ' + accNumber);
    const accBalance = this.getBalance(accNumber);
    console.log('tr accbalance: ' + (await accBalance));

    const transaction = {
      tr_id: 0,
      tr_opp_acc: '',
      tr_amount: this.accForm.get('tr_amount')!.value,
      //tr_amount: this.accForm.get('acc_balance')!.value,
      tr_comment: 'Pénztári tranzakció',
      tr_date: new Date(),
      account: 'Pénztár',
    };

    const account = {
      acc_number: accNumber,
      acc_balance:
        (await accBalance) + parseFloat(this.accForm.get('tr_amount')!.value),
      acc_status: true,
    };

    if (
      this.accForm.get('tr_amount')!.value < 0 &&
      (await accBalance) < -1 * this.accForm.get('tr_amount')!.value
    ) {
      this.errorMessage = 'Nincs fedezet! Egyenleg: ' + (await accBalance);
      this.successMessage = '';
    } else if (
      this.accForm.get('tr_amount')!.value < 0 &&
      (await accBalance) >= -1 * this.accForm.get('tr_amount')!.value
    ) {
      this.successMessage = 'Rendben';
      this.errorMessage = '';
      transaction.account = this.accNumber;
      transaction.tr_opp_acc = 'Pénztár';
      console.log("kifizetés: ",transaction);
      await this.transactionService.addTransaction(transaction);
      await this.accountService.updateBalance(account);
    } else {
      this.successMessage = 'Rendben befizetés';
      this.errorMessage = '';
      transaction.account = 'Pénztár';
      transaction.tr_opp_acc = this.accNumber.acc_number;
      console.log("befizetés: ",transaction);
      await this.transactionService.addTransaction(transaction);
      await this.accountService.updateBalance(account);
    }
  }

  search: OperatorFunction<string, readonly Account[]> = (
    text$: Observable<string>
  ) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 2
          ? []
          : this.accounts
              .filter(
                (v) => v.acc_number.toString().indexOf(term.toLowerCase()) > -1
              )
              .slice(0, 10)
      )
    );

  formatter = (x: { acc_number: any }) => x.acc_number;
  resFormatter = (x: { acc_number: any }) => x.acc_number;

  async ngOnInit(): Promise<void> {
    try {
      await this.accountService.getAccounts().then((data: Account[]) => {
        this.accounts = data;
      });

      console.log(this.accounts);
      console.log(this.accNumber);
    } catch (err) {
      console.error(err);
    }
  }
}
