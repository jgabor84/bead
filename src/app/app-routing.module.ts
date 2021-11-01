import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { GetUserComponent } from './components/user/get-user/get-user.component';
import {AccountComponent} from './components/account/account.component';
import {AddAccountComponent} from './components/user/add-account/add-account.component';
import {TransactionManagementComponent} from './components/transaction-management/transaction-management.component'
import { AppComponent } from './app.component';
import {HomeComponent} from './components/home/home.component';
import {TrReportComponent} from './components/transaction-management/tr-report/tr-report.component';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';

import { AddWineComponent } from './components/add-wine/add-wine.component';
import { ListWineComponent } from './components/list-wine/list-wine.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ListReviewComponent } from './components/list-review/list-review.component';
import { EditWineComponent } from './components/edit-wine/edit-wine.component';
import { GetWineComponent } from './components/get-wine/get-wine.component';
import { LandingComponent } from './components/landing/landing.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { GuardService } from './services/guard.service';

import { WineDiscountComponent } from './components/wine-discount/wine-discount.component';
import { OrderComponent } from './components/order/order.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent
    
 
  },
  { path: 'landing', component: LandingComponent },
  { path: 'edit-wine/:id', component: EditWineComponent },
  { path: 'get-wine-review', component: ListReviewComponent },
  { path: 'add-review', component: AddReviewComponent },
  { path: 'add-review/:id', component: AddReviewComponent },
  { path: 'wines', component: ListWineComponent },
  { path: 'sale', component: WineDiscountComponent },
  { path: 'wine/:id', component: GetWineComponent },
  { path: 'add-wine', component: AddWineComponent },
  { path: 'admin', component: BoardAdminComponent, canActivate: [GuardService] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'edit-profile/:id', component: EditProfileComponent },
  { path: 'order', component: OrderComponent },
  { path: 'manage-orders', component: ManageOrdersComponent }, 

  {
    path: 'home',
    component: HomeComponent
    
 
  },
  {
    path: 'users',
    component: UserComponent,
    canActivate: [GuardService] 
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
