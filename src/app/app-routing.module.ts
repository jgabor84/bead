import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { GetUserComponent } from './user/get-user/get-user.component';
import {AccountComponent} from './account/account.component';
import {AddAccountComponent} from './user/add-account/add-account.component';
import {TransactionManagementComponent} from './transaction-management/transaction-management.component'
import { AppComponent } from './app.component';
import {HomeComponent} from './home/home.component';
import {TrReportComponent} from './transaction-management/tr-report/tr-report.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    
 
  },
  {
    path: 'home',
    component: HomeComponent
    
 
  },
  {
    path: 'users',
    component: UserComponent
  },
  {
    path: 'users/:id',
    component: UserComponent
  },
  {
    path: 'client-accounts/:id',
    component: AccountComponent
  },
  {
    path: 'getaccid/:id',
    component: AddAccountComponent
  },
  {
    path: 'transactions',
    component: TransactionManagementComponent
  },
  {
    path: 'reports/:id',
    component: TrReportComponent
  },
  {
    path: 'reports',
    component: TrReportComponent
  }



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
