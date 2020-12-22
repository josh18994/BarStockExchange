import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import {
  ActionTypes,
  GetLiquorById,
  GetLiquorByIdSuccess,
  StartConnection,
  TestLiquorApp,
  TestLiquorAppSuccess,
  UpdateRecieved
} from './app.actions';


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService, cookieService: CookieService) { }

  @Effect()
  public getLiquorList$ = this.actions$.pipe(
    ofType<TestLiquorApp>(ActionTypes.TestLiquorApp),
    mergeMap((action: TestLiquorApp) => this.appService.getLiquorList()
      .pipe(
        map((response: any) => {
          const payload = {
            result: response.data.getAllLiquor,
            loading: response.loading,
            networkStatus: response.networkStatus
          };
          return new TestLiquorAppSuccess(payload);
        })
      )
    )
  );


  @Effect()
  public startConnection$ = this.actions$.pipe(
    ofType<StartConnection>(ActionTypes.StartConnection),
    mergeMap((action: StartConnection) => this.appService.startConnection()
      .pipe(
        map((response: any) => {
          return new UpdateRecieved(response);
        })
      )
    )
  );

  @Effect()
  public getLiquorById$ = this.actions$.pipe(
    ofType<GetLiquorById>(ActionTypes.GetLiquorById),
    mergeMap((action: GetLiquorById) => this.appService.getLiquorById()
      .pipe(
        map((response: any) => {
          return new GetLiquorByIdSuccess(response);
        })
      )
    )
  );
}
