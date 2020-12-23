import { IUser } from 'src/app/models/IUser';
import { IValidate } from 'src/app/models/IValidate';
import { Actions, ActionTypes } from './auth.actions';
import { IAuthState } from './auth.state';

export const initialState: IAuthState = {
  user: {} as IUser,
  loading: false,
  error: [],
  validate: {} as IValidate
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

    case ActionTypes.AuthenticateCookie:
      return {
        ...state,
        loading: true
      };

    case ActionTypes.AuthenticateCookieSuccessful:
      return {
        ...state,
        user: action.payload,
        loading: false
      };

    case ActionTypes.Failure:
      return {
        ...state,
        loading: false,
        error: action.error
      };

    case ActionTypes.CheckUserExistsSuccessful:
      return {
        ...state,
        validate: {
          ...state.validate,
          usernameExists: action.response
        }
      };

    case ActionTypes.ClearUsernameExists:
      return {
        ...state,
        validate: {
          ...state.validate,
          usernameExists: undefined
        }
      };

    case ActionTypes.CreateUserSucessful:
      return {
        ...state,
        loading: false,
        user: action.response
      };

    default:
      return state;
  }
}
