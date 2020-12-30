import { createSelector } from '@ngrx/store';
import { IAppState } from '..';
import { ILiquorAppState } from './app.state';

const appState = (state: IAppState) => state.app;


export const getLiquorInfoById = createSelector(
  appState,
  (state: ILiquorAppState, props) => {
    return state.data.filter(item => item._id === props.id)[0];
  }
);

