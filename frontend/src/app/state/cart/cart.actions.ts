import { Action } from '@ngrx/store';

export enum ActionTypes {
  AddToCart = '[CART-APP] AddToCart',
  AddToCartSuccessful = '[CART-APP] AddToCartSuccessful',
  GetCart = '[CART-APP] GetCart',
  GetCartSuccessful = '[CART-APP] GetCartSuccessful',
  Failure = '[CART-APP] Failure',
}

export class AddToCart implements Action {
  public readonly type = ActionTypes.AddToCart;
  constructor(public itemId: string, public quantity: number) { }
}

export class AddToCartSuccessful implements Action {
  public readonly type = ActionTypes.AddToCartSuccessful;
  constructor(public response: any) { }
}

export class GetCart implements Action {
  public readonly type = ActionTypes.GetCart;
}

export class GetCartSuccessful implements Action {
  public readonly type = ActionTypes.GetCartSuccessful;
  constructor(public response: any) { }
}

export class Failure implements Action {
  public readonly type = ActionTypes.Failure;
  constructor(public error: any) { }
}

export type Actions = AddToCart |
  AddToCartSuccessful |
  GetCart |
  GetCartSuccessful |
  Failure;
