import { ActionReducerMap } from '@ngrx/store';
import { ILiquorAppState } from './app/app.state';
import { reducer as appReducer } from './app/app.reducers';
import { reducer as authReducer } from './auth/auth.reducers';
import { reducer as cartReducer } from './cart/cart.reducers';
import { AppEffects } from './app/app.effects';
import { AuthEffects } from './auth/auth.effects';
import { IAuthState } from './auth/auth.state';
import { ICartState } from './cart/cart.state';
import { CartEffects } from './cart/cart.effects';

export interface IAppState {
  app: ILiquorAppState;
  auth: IAuthState;
  cart: ICartState;
}

export const reducers: ActionReducerMap<IAppState> = {
  app: appReducer,
  auth: authReducer,
  cart: cartReducer
};

export const effects = [
  AppEffects,
  AuthEffects,
  CartEffects
];
