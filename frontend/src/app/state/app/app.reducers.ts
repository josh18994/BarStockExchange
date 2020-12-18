import { ILiquor } from 'src/app/models/ILiquor';
import { Actions, ActionTypes } from './app.actions';
import { ILiquorAppState } from './app.state';

export const initialState: ILiquorAppState = {
  data: []
};


export function reducer(state: ILiquorAppState = initialState, action: Actions): ILiquorAppState {
  switch (action.type) {

    case ActionTypes.TestLiquorAppSuccess:
      return {
        ...state,
        data: action.payload.result
      };

    case ActionTypes.UpdateRecieved:
      const updatedDataFromServer = action.payload.data.updatedLiquorList;
      const stateData = [...state.data];
      const newStateData = [];
      stateData.forEach(obj => {
        if (obj.id === updatedDataFromServer.id) {
          newStateData.push(updatedDataFromServer);
        }
        else { newStateData.push(obj); }
      });
      return {
        ...state,
        data: newStateData
      };

    default:
      return state;
  }
}
