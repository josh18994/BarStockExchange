import { ILiquor } from 'src/app/models/ILiquor';
import { Actions, ActionTypes } from './app.actions';
import { ILiquorAppState } from './app.state';

export const initialState: ILiquorAppState = {
  title: '',
  data: [],
};


export function reducer(state: ILiquorAppState = initialState, action: Actions): ILiquorAppState {
  switch (action.type) {


    case ActionTypes.SetTitle:
      return {
        ...state,
        title: action.title
      };

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

    case ActionTypes.Failure:
      return {
        ...state,
      };

    default:
      return state;
  }
}
