import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AccountDashboardModule } from './account-dashboard/account-dashboard.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingSpinnerComponent } from './common/loading-spinner/loading-spinner.component';
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

@NgModule({
  declarations: [
    AppComponent,
    LiquorComponent,
    LiquorTileComponent,
    WelcomeComponent,
    LoadingSpinnerComponent,
    CheckoutComponent,
    PaymentComponent,
    DiscountComponent,
    TotalComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {
      runtimeChecks: {
        strictActionImmutability: false,
        strictStateImmutability: false
      }
    }),
    // StoreRouterConnectingModule.forRoot({
    //   serializer: CustomSerializer,
    // }),
    EffectsModule.forRoot(effects),
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AccountDashboardModule,
    BrowserAnimationsModule,
  ],
  providers: [CookieService, {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}, JwtHelperService],
  bootstrap: [AppComponent],
  entryComponents: [CheckoutComponent]
})
export class AppModule { }

