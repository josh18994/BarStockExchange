import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AUTHENTICATION_COOKIE_NAME } from './common/constants';
import { IAppState } from './state';
import { AuthenticateCookie } from './state/app/app.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private cookieService: CookieService, private store: Store<IAppState>) { }

  ngOnInit() {
    console.log(this.cookieService.get(AUTHENTICATION_COOKIE_NAME));

    if (this.cookieService.get(AUTHENTICATION_COOKIE_NAME)) {
      this.store.dispatch(new AuthenticateCookie());
    }
  }

}
