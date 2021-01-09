import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, mergeMap } from 'rxjs/operators';
import { AppService } from 'src/app/services/app.service';
import {
  ActionTypes,
  GetLiquorById,
  GetLiquorByIdSuccess,
  StartConnection,
  GetLiquorList,
  GetLiquorListSuccess,
  UpdateRecieved
} from './app.actions';


@Injectable()
export class AppEffects {
  constructor(private actions$: Actions, private appService: AppService) { }

  @Effect()
  public getLiquorList$ = this.actions$.pipe(
    ofType<GetLiquorList>(ActionTypes.TestLiquorApp),
    mergeMap((action: GetLiquorList) => this.appService.getLiquorList(action.pageSize, action.pageNum, action.search, action.filter)
      .pipe(
        map((response: any) => {
          const payload = {
            result: response.data.getAllLiquor.data,
            loading: response.loading,
            networkStatus: response.networkStatus,
            totalCount: response.data.getAllLiquor.total
          };
          return new GetLiquorListSuccess(payload);
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
