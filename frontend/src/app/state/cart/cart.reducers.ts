import { Actions, ActionTypes } from "./cart.actions";
import { ICartState } from "./cart.state";


export const initialState: ICartState = {
  liquor: [],
  total: ''
}

export function reducer(state: ICartState = initialState, action: Actions): ICartState {
  switch (action.type) {

    case ActionTypes.GetCartSuccessful:

      return {
        ...state,
        liquor: action.response
      }

    case ActionTypes.UpdateCartSuccessful:
      return {
        ...state,
        liquor: action.response
      }

    case ActionTypes.CalculateTotalSuccessful:
      return {
        ...state,
        total: action.response
      }

    default:
      return {
        ...state
      }
  }


}



