import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { IUser } from 'src/app/models/IUser';
import { AuthService } from 'src/app/services/auth.service';
import { ActionTypes, LoginUser, LoginUserSuccessful, Failure } from './auth.actions';
import { of } from 'rxjs';

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
}
