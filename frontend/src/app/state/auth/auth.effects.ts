import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import {
  ActionTypes,
  AuthenticateCookie,
  AuthenticateCookieSuccessful,
  CheckUserExists,
  Failure,
  LoginUser,
  LoginUserSuccessful,
  CheckUserExistsSuccessful,
  CreateUser,
  CreateUserSucessful
} from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) { }

  @Effect()
  public loginUser$ = this.actions$.pipe(
    ofType<LoginUser>(ActionTypes.LoginUser),
    mergeMap((action: LoginUser) => this.authService.loginUser(action.username, action.password)
      .pipe(
        map((response: any) => {
          const payload = {
            email: response.data.login.user.email,
            firstName: response.data.login.user.firstName,
            lastName: response.data.login.user.lastName,
            username: response.data.login.user.username
          } as IUser;
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
          const payload = {
            email: response.data.authenticateCookie.email || null,
            firstName: response.data.authenticateCookie.firstName,
            lastName: response.data.authenticateCookie.lastName,
            username: response.data.authenticateCookie.username
          } as IUser;
          return new AuthenticateCookieSuccessful(payload);
        }),
        catchError(error => {
          return of(new Failure(error));
        })
      )
    )
  );

  @Effect()
  public checkUserExists$ = this.actions$.pipe(
    ofType<CheckUserExists>(ActionTypes.CheckUserExists),
    mergeMap((action: CheckUserExists) => this.authService.checkUserExists(action.username)
      .pipe(
        map((response) => {
          const payload = response.data.checkUserExists;
          return new CheckUserExistsSuccessful(payload);
        }),
        catchError(error => {
          return of(new Failure(error));
        })
      )
    )
  );

  @Effect()
  public createUser$ = this.actions$.pipe(
    ofType<CreateUser>(ActionTypes.CreateUser),
    mergeMap((action: CreateUser) => this.authService.createUser(action.payload)
      .pipe(
        map((response) => {
          const payload = {
            email: response.data.createUser.email || null,
            firstName: response.data.createUser.firstName,
            lastName: response.data.createUser.lastName,
            username: response.data.createUser.username
          } as IUser;
          return new LoginUser(payload.username, action.payload.password);
        }),
        catchError(error => {
          return of(new Failure(error));
        })
      )
    )
  );
}
