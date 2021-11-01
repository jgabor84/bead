import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../../services/account.service';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { Account } from '../../models/account.model';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  accounts: Account[];

  chartData: number[] = [];
  chartLabel: string[] = [];
  chartColors: string[] = [];

  public lineChartData: ChartDataSets[] = [
    { data: this.chartData, label: 'Számlák egyenlege' },
  ];
  public lineChartLabels: Label[] = this.chartLabel;
  public lineChartColors: any[] = 
  [
      {
          backgroundColor: this.chartColors,
          borderColor: 'rgba(106,185,236,1)'
      }
  ]

  public lineChartLegend = true;
  public lineChartType = "'doughnut'";
  public lineChartPlugins = [];

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
      data.forEach((x) => this.chartData.push(x.acc_balance));
      data.forEach((x) => this.chartLabel.push(x.acc_number));
      data.forEach((x) => this.chartColors.push("#"+Math.floor(Math.random()*16777215).toString(16)));
       
     });
       
       console.log(this.accounts);
     } catch (err) {
       console.error(err);
     }

  }

}
