import { Actions, ActionTypes } from "./cart.actions";
import { ICartState } from "./cart.state";


export const initialState: ICartState = {
  liquor: [],
  total: '',
  busy: false
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

    case ActionTypes.CheckoutUserCart:
      return {
        ...state,
        busy: true
      }

    case ActionTypes.CheckoutUserCartSuccessful:
      return {
        ...state,
        liquor: [],
        total: '',
        busy: false
      }

    case ActionTypes.Failure:
      return {
        ...state,
        busy: false
      }

    default:
      return {
        ...state
      }
  }


}



