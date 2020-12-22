import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { ActionTypes, AuthenticateCookie, AuthenticateCookieSuccessful, Failure, LoginUser, LoginUserSuccessful } from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  public loginUser$ = this.actions$.pipe(
    ofType<LoginUser>(ActionTypes.LoginUser),
    mergeMap((action: LoginUser) => this.authService.loginUser(action.username, action.password)
      .pipe(
        map((response: any) => {
          const payload: IUser = {
            email: response.data.login.user.email,
            firstName: response.data.login.user.firstName,
            lastName: response.data.login.user.lastName,
            username: response.data.login.user.username
          };
          return new LoginUserSuccessful(payload);
        }),
        catchError(error => of(new Failure(error)))
      )
    )
  );

  @Effect()
  public authenticateCookie$ = this.actions$.pipe(
    ofType<AuthenticateCookie>(ActionTypes.AuthenticateCookie),
    mergeMap((action: AuthenticateCookie) => this.authService.authenticateCookie()
      .pipe(
        map((response: any) => {
          const payload: IUser = {
            email: response.data.authenticateCookie.email || null,
            firstName: response.data.authenticateCookie.firstName,
            lastName: response.data.authenticateCookie.lastName,
            username: response.data.authenticateCookie.username
          };
          return new AuthenticateCookieSuccessful(payload);
        }),
        catchError(error => {
          return of(new Failure(error))
        })
      )
    )
  );
}
