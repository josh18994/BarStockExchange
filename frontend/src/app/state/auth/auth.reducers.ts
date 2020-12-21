import { IUser } from 'src/app/models/IUser';
import { Actions, ActionTypes } from './auth.actions';
import { IAuthState } from './auth.state';

export const initialState: IAuthState = {
  user: {} as IUser,
  loading: false
};


export function reducer(state: IAuthState = initialState, action: Actions): IAuthState {
  switch (action.type) {

    case ActionTypes.LoginUser:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.LoginUserSuccessful:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case ActionTypes.Failure:
      console.log(action.error);
      return {
        ...state,
        loading: false
      };

    default:
      return state;
  }
}
