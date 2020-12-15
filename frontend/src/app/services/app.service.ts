import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';


const GET_LIQUOR = gql`
{
  getAllLiquor{
    id
    brandName
    type
  }
}`;

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private apollo: Apollo) { }


  // Get All Liquor Brands Query
  public getLiquorList(): Observable<any> {
    return this.apollo.query({ query: GET_LIQUOR });
  }
}
