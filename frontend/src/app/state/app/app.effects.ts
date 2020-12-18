import { ActionCreator } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { ActionTypes, StartConnection, TestLiquorApp, TestLiquorAppSuccess, UpdateRecieved } from './app.actions';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import { ILiquor } from 'src/app/models/ILiquor';


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) { }

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
}
