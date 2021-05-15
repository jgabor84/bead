import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
import {Transaction} from '../../models/transaction.model';
import {Transactions} from '../../models/transactions.model';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute ,Router } from '@angular/router';




@Component({
  selector: 'app-tr-report',
  templateUrl: './tr-report.component.html',
  styleUrls: ['./tr-report.component.css'],
  providers: [DecimalPipe]
})
export class TrReportComponent implements OnInit {


  transactions:Transactions[];
  allTrans:Transactions[];
  filter = new FormControl('');

  constructor(
    private activatedRoute: ActivatedRoute, 
    private router:Router,
    private transactionService: TransactionService, 
    pipe: DecimalPipe) {

   }

 

   search(value: string): void {
    this.transactions = this.allTrans.filter(
      (val) => 
      val.tr_amount.toString().toLowerCase().includes(value) ||
      val.tr_comment.toLowerCase().includes(value) ||
      val.account.acc_number.toString().toLowerCase().includes(value) ||
      val.tr_opp_acc.toString().toLowerCase().includes(value)
      );
    
  }


 

  async ngOnInit(): Promise<void> {
    try {
       const accId = this.activatedRoute.snapshot.params.id;
      if(accId){
        await this.transactionService.getAccTransactions(accId).then((data: Transactions[]) => {
      
          this.transactions= data;
          this.allTrans = this.transactions;
          
        });
      }
      else{
        await this.transactionService.getTransactions().then((data: Transactions[]) => {
      
          this.transactions= data;
          this.allTrans = this.transactions;
        });
      }
     
      
   
      
      console.log("transactions oninit: ",this.transactions);
    } catch (err) {
      console.error(err);
    }
  }

}

