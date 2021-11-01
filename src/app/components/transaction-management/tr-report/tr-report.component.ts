import { Component, OnInit, PipeTransform } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { TransactionService } from 'src/app/services/transaction.service';
import { Transaction } from '../../../models/transaction.model';
import { Transactions } from '../../../models/transactions.model';
import { FormControl } from '@angular/forms';
import { DecimalPipe } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-tr-report',
  templateUrl: './tr-report.component.html',
  styleUrls: ['./tr-report.component.css'],
  providers: [DecimalPipe],
})
export class TrReportComponent implements OnInit {
  transactions: Transactions[];
  allTrans!: Transactions[];
  chartData: number[] = [];
  chartLabel: string[] = [];
  chartColors: string[] = [];
  filter = new FormControl('');

  public lineChartData: ChartDataSets[] = [
    { data: this.chartData, label: 'Series A' },
  ];
  public lineChartLabels: Label[] = this.chartLabel;

  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: this.chartColors,
    },
  ];
  public lineChartLegend = true;
  public lineChartType = "'bar'";
  public lineChartPlugins = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private transactionService: TransactionService,
    pipe: DecimalPipe
  ) {
    
  }

  search(value: string): void {
    this.transactions, this.allTrans = this.allTrans.filter(
      (val) =>
        val.tr_amount.toString().toLowerCase().includes(value) ||
        val.tr_comment.toLowerCase().includes(value) ||
        val.account.acc_number.toString().toLowerCase().includes(value) ||
        val.tr_opp_acc.toString().toLowerCase().includes(value) ||
        val.tr_date.toString().toLowerCase().includes(value)
    );
  }

  async ngOnInit(): Promise<void> {




    try {
      const accId = this.activatedRoute.snapshot.params.id;
      if (accId) {
        await this.transactionService
          .getAccTransactions(accId)
          .then((data: Transactions[]) => {
            this.transactions = data;
            this.allTrans = this.transactions;
            data.forEach((x) => this.chartData.push(x.tr_amount));
      data.forEach((x) => this.chartLabel.push(x.tr_date.toString()));
      data.forEach((x) => this.chartColors.push( x.tr_amount < 0 ? '#ff0000c9':'#008000c2'));
          });
      } else {
        await this.transactionService
          .getTransactions()
          .then((data: Transactions[]) => {
            this.transactions = data;
            this.allTrans = this.transactions;
            data.forEach((x) => this.chartData.push(x.tr_amount));
      data.forEach((x) => this.chartLabel.push(x.tr_date.toString()));
      data.forEach((x) => this.chartColors.push( x.tr_amount < 0 ? '#ff0000c9':'#008000c2'));
          });
      }

      
    } catch (err) {
      console.error(err);
    }
  }
}
