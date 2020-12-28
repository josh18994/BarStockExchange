import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { ADD_TO_ORDER, GET_ORDER_INFO } from '../graphql/gql';


@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private apollo: Apollo) { }


  public addToCart(liquorId: string, quantity: number): Observable<any> {
    return this.apollo.mutate({
      mutation: ADD_TO_ORDER,
      variables: {
        liquorId,
        quantity
      }
    })
  }

  public getOrderInfo() {
    return this.apollo.query({query: GET_ORDER_INFO});
  }

}
