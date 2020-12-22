import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { Observable } from 'rxjs';
import { GET_LIQUOR, GET_LIQUOR_BY_ID, START_CONNECTION } from '../graphql/gql';


@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private apollo: Apollo, private http: HttpClient) { }

  public getLiquorList(): Observable<any> {
    return this.apollo.query({ query: GET_LIQUOR });
  }

  public startConnection(): Observable<any> {
    return this.apollo.subscribe({ query: START_CONNECTION });
  }

  // Should move this to another module
  public getLiquorById(): Observable<any> {
    return this.apollo.query({ query: GET_LIQUOR_BY_ID, variables: { id: 'f6f45fa6-e20e-4411-8936-1c5f3c918ef7' } });
  }

}
