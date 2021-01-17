import { Action } from '@ngrx/store';
import { IProductInfo } from 'src/app/models/IProductInfo';

export enum ActionTypes {
  UpdateCart = '[CART-APP] UpdateCart',
  UpdateCartSuccessful = '[CART-APP] UpdateCartSuccessful',
  GetCart = '[CART-APP] GetCart',
  GetCartSuccessful = '[CART-APP] GetCartSuccessful',
  CalculateTotal = '[CART-APP] CalculateTotal',
  CalculateTotalSuccessful = '[CART-APP] CalculateTotalSuccessful',
  CheckoutUserCart = '[CART-APP] CheckoutUserCart',
  CheckoutUserCartSuccessful = '[CART-APP] CheckoutUserCartSuccessful',
  Failure = '[CART-APP] Failure',
}

export class UpdateCart implements Action {
  public readonly type = ActionTypes.UpdateCart;
  constructor(public itemId: string, public quantity: number) { }
}

export class UpdateCartSuccessful implements Action {
  public readonly type = ActionTypes.UpdateCartSuccessful;
  constructor(public response: any) { }
}

export class GetCart implements Action {
  public readonly type = ActionTypes.GetCart;
}

export class GetCartSuccessful implements Action {
  public readonly type = ActionTypes.GetCartSuccessful;
  constructor(public response: any) { }
}

export class CalculateTotal implements Action {
  public readonly type = ActionTypes.CalculateTotal;
}

export class CalculateTotalSuccessful implements Action {
  public readonly type = ActionTypes.CalculateTotalSuccessful;
  constructor(public response: any) { }
}

export class CheckoutUserCart implements Action {
  public readonly type = ActionTypes.CheckoutUserCart;
  constructor(public payload: IProductInfo[]) { }
}

export class CheckoutUserCartSuccessful implements Action {
  public readonly type = ActionTypes.CheckoutUserCartSuccessful;
  constructor(public response: any) { }
}

export class Failure implements Action {
  public readonly type = ActionTypes.Failure;
  constructor(public error: any) { }
}

export type Actions = UpdateCart |
  UpdateCartSuccessful |
  GetCart |
  GetCartSuccessful |
  CalculateTotal |
  CalculateTotalSuccessful |
  CheckoutUserCart |
  CheckoutUserCartSuccessful |
  Failure;
