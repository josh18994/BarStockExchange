import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountDashboardRoutingModule } from './account-dashboard-routing.module';



@NgModule({
  declarations: [
    LayoutComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccountDashboardRoutingModule
  ]
})
export class AccountDashboardModule { }
