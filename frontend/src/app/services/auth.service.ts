import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { AUTHENTICATE_COOKIE, LOGIN_USER, CHECK_USER_EXISTS } from '../graphql/gql';
import { CookieService } from 'ngx-cookie-service';
import { AUTHENTICATION_COOKIE_NAME } from '../common/constants';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private apollo: Apollo, private cookieService: CookieService) { }

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

  public isLoggedIn(): boolean {
    return !!this.cookieService.get(AUTHENTICATION_COOKIE_NAME);
  }


  public authenticateCookie(): Observable<any> {
    return this.apollo.query({ query: AUTHENTICATE_COOKIE });
  }

  public checkUserExists(username): Observable<any> {
    return this.apollo.query({ query: CHECK_USER_EXISTS, variables: { username } });
  }

}
