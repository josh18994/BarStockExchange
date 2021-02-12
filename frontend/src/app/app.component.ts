import { AfterViewInit, Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { debounce } from 'lodash';
import { AUTHENTICATION_COOKIE_NAME } from './common/constants';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ILiquor, LiquorInfo } from './models/ILiquor';
import { IAppState } from './state';
import { GetLiquorList } from './state/app/app.actions';
import { ILiquorAppState } from './state/app/app.state';
import { AuthenticateCookie } from './state/auth/auth.actions';
import { IAuthState } from './state/auth/auth.state';
import { ICartState } from './state/cart/cart.state';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [
    './app.component.scss'
  ]
})


export class AppComponent implements OnInit, AfterViewInit {

  public innerWidth: any;

  public authState: Observable<IAuthState>;
  public appState: Observable<ILiquorAppState>;
  public cartState: Observable<ICartState>;
  public form: FormGroup;
  public liquorList: Array<ILiquor>;
  public userCart: Array<LiquorInfo>;

  public title: string;

  constructor(
    private cookieService: CookieService,
    private store: Store<IAppState>,
    private dialog: MatDialog,
    private formBuilder: FormBuilder) {
      this.onResize = debounce(this.onResize, 50, {leading: false, trailing: true});
    }

  ngOnInit() {

    this.form = this.formBuilder.group({
      search: [''],
    });

    this.authState = this.store.select(state => state.auth);

    this.store.select(state => state.app).subscribe(app => {
      this.title = app.title;
      this.liquorList = app.data;
    });

    this.store.select(state => state.cart).subscribe(cart => {
      this.userCart = cart.liquor;
    });

    if (this.cookieService.get(AUTHENTICATION_COOKIE_NAME)) {
      this.store.dispatch(new AuthenticateCookie());
    }

  }

  ngAfterViewInit() {
    this.innerWidth = window.innerWidth;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.innerWidth = window.innerWidth;
  }

  openCheckoutModal() {
    let height = '615px';
    let width = '1320px';
    if (window.innerWidth < 1680 && window.innerHeight < 914) {
      height = '70vh';
      width = '80vw';
    }
    this.dialog.open(CheckoutComponent, {
      height,
      width,
      backdropClass: 'backdropBackground'
    });
  }

  logout() {
    this.cookieService.delete(AUTHENTICATION_COOKIE_NAME);
  }

  search() {
    this.store.dispatch(new GetLiquorList('16', '1', this.form.get('search').value, ''));
  }
}
// TODO: 4. Show Errors on Forms







