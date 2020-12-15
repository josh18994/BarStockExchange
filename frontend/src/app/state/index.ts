import { ActionReducerMap } from '@ngrx/store';
import { ILiquorAppState } from './app/app.state';
import { reducer as appReducer } from './app/app.reducers';
import { AppEffects } from './app/app.effects';

export interface IAppState {
  app: ILiquorAppState;
}

export const reducers: ActionReducerMap<IAppState> = {
  app: appReducer
};

export const effects = [
  AppEffects
];


