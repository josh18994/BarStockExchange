import { Actions, ActionTypes } from "./cart.actions";
import { ICartState } from "./cart.state";


export const initialState: ICartState = {
  liquor: []
}

export function reducer(state: ICartState = initialState, action: Actions): ICartState {
  switch (action.type) {

    case ActionTypes.GetCartSuccessful:

      return {
        ...state,
        liquor: action.response
      }

    case ActionTypes.AddToCartSuccessful:
      return {
        ...state,
        liquor: action.response
      }

    default:
      return {
        ...state
      }
  }


}



