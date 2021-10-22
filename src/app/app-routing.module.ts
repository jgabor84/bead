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

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';

import { AddWineComponent } from './add-wine/add-wine.component';
import { ListWineComponent } from './list-wine/list-wine.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ListReviewComponent } from './list-review/list-review.component';
import { EditWineComponent } from './edit-wine/edit-wine.component';
import { GetWineComponent } from './get-wine/get-wine.component';
import { LandingComponent } from './landing/landing.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { GuardService } from './services/guard.service';

import { WineDiscountComponent } from './wine-discount/wine-discount.component';


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
