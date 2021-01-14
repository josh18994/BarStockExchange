import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { CALCULATE_TOTAL, CHECKOUT_USER_CART, GET_CART_INFO, UPDATE_ORDER } from '../graphql/gql';
import { IProductInfo } from '../models/IProductInfo';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apollo: Apollo) { }


  public updateCart(liquorId: string, quantity: number): Observable<any> {
    return this.apollo.mutate({
      mutation: UPDATE_ORDER,
      variables: {
        liquorId,
        quantity
      }
    })
  }

  public getCartInfo() {
    return this.apollo.query({ query: GET_CART_INFO });
  }

  public calculateTotal() {
    return this.apollo.mutate({ mutation: CALCULATE_TOTAL });
  }

  public checkoutUserCart(products: IProductInfo[]) {
    return this.apollo.mutate({
      mutation: CHECKOUT_USER_CART,
      variables: {
        products
      }
    });
  }

}
