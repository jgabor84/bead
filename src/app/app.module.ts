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
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { LoginComponent } from './login/login.component';

import { authInterceptorProviders } from './helper/auth.interceptor';
import { RegisterComponent } from './register/register.component';
import { AddWineComponent } from './add-wine/add-wine.component';
import { ListWineComponent } from './list-wine/list-wine.component';
import { AddReviewComponent } from './add-review/add-review.component';
import { ListReviewComponent } from './list-review/list-review.component';

import { CartComponent } from './cart/cart.component';
import { AddCartComponent } from './add-cart/add-cart.component';
import { EditWineComponent } from './edit-wine/edit-wine.component';

import { NgxBootstrapSliderModule } from 'ngx-bootstrap-slider';
import { GetWineComponent } from './get-wine/get-wine.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { FileUploadModule  } from 'ng2-file-upload';
import { LandingComponent } from './landing/landing.component';
import { FindWineComponent } from './find-wine/find-wine.component';

import { NgSelectModule } from '@ng-select/ng-select';
import { ManageCarouselComponent } from './manage-carousel/manage-carousel.component';
import { EditCarouselComponent } from './edit-carousel/edit-carousel.component';
import { EditCarouselItemComponent } from './edit-carousel-item/edit-carousel-item.component';

import { NgDragDropModule } from 'ng-drag-drop';
import { WineTopRatingComponent } from './wine-top-rating/wine-top-rating.component';
import { DragulaModule } from 'ng2-dragula';
import { ManageUsersComponent } from './admin/manage-users/manage-users.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

import { GuardService } from './services/guard.service';
import { WineDiscountComponent } from './wine-discount/wine-discount.component';


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
    WineDiscountComponent

    
    
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
