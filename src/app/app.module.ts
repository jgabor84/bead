import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GetUserComponent } from './components/user/get-user/get-user.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListFilterPipe } from './pipes/listFilterPipe';
import { ChartsModule } from 'ng2-charts';

import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { DeleteUserComponent } from './components/user/delete-user/delete-user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { AddAccountComponent } from './components/user/add-account/add-account.component';
import { AccountComponent } from './components/account/account.component';
import { AddTransactionComponent } from './components/account/add-transaction/add-transaction.component';
import { TransactionManagementComponent } from './components/transaction-management/transaction-management.component';
import { TrCashComponent } from './components/transaction-management/tr-cash/tr-cash.component';
import { TrTransferComponent } from './components/transaction-management/tr-transfer/tr-transfer.component';
import { TrReportComponent } from './components/transaction-management/tr-report/tr-report.component';
import { HomeComponent } from './components/home/home.component';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { LoginComponent } from './components/login/login.component';

import { authInterceptorProviders } from './helper/auth.interceptor';
import { RegisterComponent } from './components/register/register.component';
import { AddWineComponent } from './components/add-wine/add-wine.component';
import { ListWineComponent } from './components/list-wine/list-wine.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { ListReviewComponent } from './components/list-review/list-review.component';

import { CartComponent } from './components/cart/cart.component';
import { AddCartComponent } from './components/add-cart/add-cart.component';
import { EditWineComponent } from './components/edit-wine/edit-wine.component';

import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { GetWineComponent } from './components/get-wine/get-wine.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FileUploadModule  } from 'ng2-file-upload';
import { LandingComponent } from './components/landing/landing.component';
import { FindWineComponent } from './components/find-wine/find-wine.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { ManageCarouselComponent } from './components/manage-carousel/manage-carousel.component';
import { EditCarouselComponent } from './components/edit-carousel/edit-carousel.component';
import { EditCarouselItemComponent } from './components/edit-carousel-item/edit-carousel-item.component';

import { NgDragDropModule } from 'ng-drag-drop';
import { WineTopRatingComponent } from './components/wine-top-rating/wine-top-rating.component';
import { DragulaModule } from 'ng2-dragula';
import { ManageUsersComponent } from './components/admin/manage-users/manage-users.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';

import { GuardService } from './services/guard.service';
import { WineDiscountComponent } from './components/wine-discount/wine-discount.component';
import { OrderComponent } from './components/order/order.component';
import { ManageOrdersComponent } from './components/manage-orders/manage-orders.component';



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
    HomeComponent,
    BoardAdminComponent,
    LoginComponent,
    RegisterComponent,
    AddWineComponent,
    ListWineComponent,
    AddReviewComponent,
    ListReviewComponent,

    CartComponent,
    AddCartComponent,
    EditWineComponent,
    GetWineComponent,
    LandingComponent,
    FindWineComponent,
    ManageCarouselComponent,
    EditCarouselComponent,
    EditCarouselItemComponent,
    WineTopRatingComponent,
    ManageUsersComponent,
    EditProfileComponent,
    WineDiscountComponent,
    OrderComponent,
    ManageOrdersComponent
    

    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgxBootstrapSliderModule,
    ChartsModule,
    NgSelectModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot(),
    FileUploadModule,
   // NgDragDropModule.forRoot(),
   DragulaModule.forRoot()
    
  ],
  providers: [authInterceptorProviders,GuardService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
