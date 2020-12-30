import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { UPDATE_ORDER, GET_ORDER_INFO } from '../graphql/gql';


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

  public getOrderInfo() {
    return this.apollo.query({query: GET_ORDER_INFO});
  }

}
