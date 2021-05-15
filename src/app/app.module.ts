import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetUserComponent } from './user/get-user/get-user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipe } from './pipes/listFilterPipe';
import { ChartsModule } from 'ng2-charts';

import { EditUserComponent } from './user/edit-user/edit-user.component';
import { DeleteUserComponent } from './user/delete-user/delete-user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { AddAccountComponent } from './user/add-account/add-account.component';
import { AccountComponent } from './account/account.component';
import { AddTransactionComponent } from './account/add-transaction/add-transaction.component';
import { TransactionManagementComponent } from './transaction-management/transaction-management.component';
import { TrCashComponent } from './transaction-management/tr-cash/tr-cash.component';
import { TrTransferComponent } from './transaction-management/tr-transfer/tr-transfer.component';
import { TrReportComponent } from './transaction-management/tr-report/tr-report.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    GetUserComponent,
    EditUserComponent,
    DeleteUserComponent,
    AddUserComponent,
    ListFilterPipe,
    AddAccountComponent,
    AccountComponent,
    AddTransactionComponent,
    TransactionManagementComponent,
    TrCashComponent,
    TrTransferComponent,
    TrReportComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    ChartsModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
