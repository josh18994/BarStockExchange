import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { AUTHENTICATION_COOKIE_NAME } from './common/constants';
import { IAppState } from './state';
import { AuthenticateCookie } from './state/auth/auth.actions';
import { Observable } from 'rxjs';
import { IAuthState } from './state/auth/auth.state';
import { IUser } from './models/IUser';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public authState: Observable<IAuthState>;

  constructor(private cookieService: CookieService, private store: Store<IAppState>) { }

  ngOnInit() {

    // this.authState = this.store.select(state => state.auth);

    this.authState = this.store.select(state => state.auth);

    if (this.cookieService.get(AUTHENTICATION_COOKIE_NAME)) {
      this.store.dispatch(new AuthenticateCookie());
    }
  }
}
// TODO: 2. Show navbar based on User
// TODO: 3. Signup User scenario
// TODO: 4. Show Errors on Forms







