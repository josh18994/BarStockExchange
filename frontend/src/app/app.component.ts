import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AUTHENTICATION_COOKIE_NAME } from './common/constants';
import { AuthenticateCookie } from './state/auth/auth.actions';
import { IAppState } from './state';
import { IAuthState } from './state/auth/auth.state';
import { ICartState } from './state/cart/cart.state';
import { ILiquorAppState } from './state/app/app.state';
import { ILiquor, LiquorInfo } from './models/ILiquor';
import { MatDialog } from '@angular/material/dialog';
import { CheckoutComponent } from './components/checkout/checkout.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})
export class AppComponent implements OnInit {

  public authState: Observable<IAuthState>;
  public appState: Observable<ILiquorAppState>;
  public cartState: Observable<ICartState>;

  public liquorList: Array<ILiquor>;
  public userCart: Array<LiquorInfo>;

  constructor(
    private cookieService: CookieService,
    private store: Store<IAppState>,
    private dialog: MatDialog) { }

  ngOnInit() {
    this.authState = this.store.select(state => state.auth);

    this.store.select(state => state.app).subscribe(app => {
      this.liquorList = app.data;
    });

    this.store.select(state => state.cart).subscribe(cart => {
      this.userCart = cart.liquor;
    });

    if (this.cookieService.get(AUTHENTICATION_COOKIE_NAME)) {
      this.store.dispatch(new AuthenticateCookie());
    }

  }

  openCheckoutModal() {
    const dialogRef = this.dialog.open(CheckoutComponent, {
      height: '70vh',
      width: '80vw'
    });
  }

  logout() {
    this.cookieService.delete(AUTHENTICATION_COOKIE_NAME);
  }

  calculateCartTotal() {

    let total = 0;
    this.userCart
      .filter((elem) => {
        const find = this.liquorList.find(({ _id }) => elem.liquorId === _id)
        total += +find.price.currentPrice * +elem.quantity;
        return find;

      });
    return total.toString();

  }
}
// TODO: 4. Show Errors on Forms







