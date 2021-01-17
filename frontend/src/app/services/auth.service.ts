import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Apollo } from 'apollo-angular';
import { CookieService } from 'ngx-cookie-service';
import { Observable } from 'rxjs';
import { AUTHENTICATION_COOKIE_NAME } from '../common/constants';
import { AUTHENTICATE_COOKIE, CHECK_USER_EXISTS, CREATE_USER, LOGIN_USER, GET_CART_INFO } from '../graphql/gql';
import { IUser } from '../models/IUser';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo, private cookieService: CookieService, private jwtHelerService: JwtHelperService) { }

  // Get All Liquor Brands Query
  public loginUser(username: string, password: string): Observable<any> {
    return this.apollo.mutate({
      mutation: LOGIN_USER,
      variables: {
        username,
        password
      }
    });
  }

  public createUser(user: IUser): Observable<any> {
    const {firstName, lastName, email, username, password} = user;
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        firstName,
        lastName,
        email,
        username,
        password
      }
    });
  }

  public isLoggedIn(): boolean {
    const cookie = this.cookieService.get(AUTHENTICATION_COOKIE_NAME);
    return !this.jwtHelerService.isTokenExpired(cookie);
  }


  public authenticateCookie(): Observable<any> {
    return this.apollo.query({ query: AUTHENTICATE_COOKIE });
  }

  public checkUserExists(username): Observable<any> {
    return this.apollo.query({ query: CHECK_USER_EXISTS, variables: { username } });
  }

  // public getOrderInfo() {
  //   return this.apollo.query({query: GET_ORDER_INFO});
  // }

}
