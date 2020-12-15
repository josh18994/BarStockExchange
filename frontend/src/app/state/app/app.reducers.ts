import { ILiquor } from 'src/app/models/ILiquor';
import { Actions, ActionTypes } from './app.actions';
import { ILiquorAppState } from './app.state';

export const initialState: ILiquorAppState = {
  data: []
};


export function reducer(state: ILiquorAppState = initialState, action: Actions): ILiquorAppState {
  switch (action.type) {

    case ActionTypes.TestLiquorAppSuccess:
      console.log(action.payload);
      return {
        ...state,
        data: action.payload.result
      };

    default:
      return state;
  }
}
