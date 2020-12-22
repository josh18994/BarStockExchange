import { ActionReducerMap } from '@ngrx/store';
import { ILiquorAppState } from './app/app.state';
import { reducer as appReducer } from './app/app.reducers';
import { reducer as authReducer } from './auth/auth.reducers';
import { AppEffects } from './app/app.effects';
import { AuthEffects } from './auth/auth.effects';
import { IAuthState } from './auth/auth.state';

export interface IAppState {
  app: ILiquorAppState;
  auth: IAuthState
}

export const reducers: ActionReducerMap<IAppState> = {
  app: appReducer,
  auth: authReducer
};

export const effects = [
  AppEffects,
  AuthEffects
];
