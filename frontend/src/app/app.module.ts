import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AccountDashboardModule } from './account-dashboard/account-dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LiquorTileComponent } from './components/liquor/liquor-tile/liquor-tile.component';
import { LiquorComponent } from './components/liquor/liquor.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { GraphQLModule } from './graphql.module';
import { effects, reducers } from './state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './common/material/material.module';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { PaymentComponent } from './components/checkout/payment/payment.component';
import { DiscountComponent } from './components/checkout/discount/discount.component';
import { TotalComponent } from './components/checkout/total/total.component';
import { SummaryComponent } from './components/checkout/summary/summary.component';
import { LiquorSummaryInfoComponent } from './components/checkout/summary/liquor-summary-info/liquor-summary-info.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './components/liquor/liquor-tile/chart/chart.component';
import { GrandtotalComponent } from './components/grandtotal/grandtotal.component';

@NgModule({
  declarations: [
    AppComponent,
    LiquorComponent,
    LiquorTileComponent,
    WelcomeComponent,
    CheckoutComponent,
    PaymentComponent,
    DiscountComponent,
    TotalComponent,
    SummaryComponent,
    LiquorSummaryInfoComponent,
    ChartComponent,
    GrandtotalComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    EffectsModule.forRoot(effects),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AccountDashboardModule,
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [CookieService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [CheckoutComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }

