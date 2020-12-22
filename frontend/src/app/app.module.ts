import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
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

@NgModule({
  declarations: [
    AppComponent,
    LiquorComponent,
    LiquorTileComponent,
    WelcomeComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
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
    ReactiveFormsModule,
    AppRoutingModule,
    GraphQLModule,
    HttpClientModule,
    AccountDashboardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }

