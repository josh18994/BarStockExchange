import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { HttpClient } from '@angular/common/http';
import { GET_LIQUOR, START_CONNECTION } from '../graphql/gql';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  // Get All Liquor Brands Query
  public getLiquorList(): Observable<any> {
    return this.apollo.query({ query: GET_LIQUOR });
  }

  public startConnection(): Observable<any> {
    return this.apollo.subscribe({ query: START_CONNECTION });
  }

}
