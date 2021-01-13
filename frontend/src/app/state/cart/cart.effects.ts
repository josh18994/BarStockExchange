import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { CartService } from 'src/app/services/cart.service';
import { ActionTypes, CalculateTotal, CalculateTotalSuccessful, Failure, GetCart, GetCartSuccessful, UpdateCart, UpdateCartSuccessful } from './cart.actions';


@Injectable()
export class CartEffects {
  constructor(private actions$: Actions, private cartService: CartService) { }

  @Effect()
  public updateCart$ = this.actions$.pipe(
    ofType<UpdateCart>(ActionTypes.UpdateCart),
    mergeMap((action: UpdateCart) => this.cartService.updateCart(action.itemId, action.quantity)
      .pipe(
        map((response: any) => {
          return new UpdateCartSuccessful(this.CartReducerDTO(response.data.updateOrder.products));
        })
      )
    )
  );

  @Effect()
  public getCart$ = this.actions$.pipe(
    ofType<GetCart>(ActionTypes.GetCart),
    mergeMap((action: GetCart) => this.cartService.getOrderInfo()
      .pipe(
        map((response: any) => {
          return new GetCartSuccessful(this.CartReducerDTO(response.data.getOrderByUser.products));
        }),
        catchError(error => {
          return of(new Failure(error));
        })
      )
    )
  );


  @Effect()
  public calculateTotal$ = this.actions$.pipe(
    ofType<CalculateTotal>(ActionTypes.CalculateTotal),
    mergeMap((action: CalculateTotal) => this.cartService.calculateTotal()
      .pipe(
        map((response: any) => {
          return new CalculateTotalSuccessful(response.data.calculateTotal.total);
        }),
        catchError(error => {
          return of(new Failure(error));
        })
      )
    )
  );

  public CartReducerDTO(payload) {
    return payload.map(({ liquor, quantity }) => ({ liquor, quantity }));
  }
}
