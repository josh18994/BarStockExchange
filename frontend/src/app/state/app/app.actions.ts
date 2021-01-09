import { Action } from '@ngrx/store';


export enum ActionTypes {
  SetTitle = 'SetTitle',
  TestLiquorApp = '[LIQUOR-APP] TestLiquorApp',
  TestLiquorAppSuccess = '[LIQUOR-APP] TestLiquorAppSuccess',
  StartConnection = '[LIQUOR-APP] StartConnection',
  UpdateRecieved = '[LIQUOR-APP] UpdateRecieved',
  GetLiquorById = '[LIQUOR-APP] GetLiquorById',
  GetLiquorByIdSuccess = '[LIQUOR-APP] GetLiquorByIdSuccess',
  Failure = '[LIQUOR-APP] Failure',
}

export class SetTitle implements Action {
  public readonly type = ActionTypes.SetTitle;
  constructor(public title: string) { }
}

export class GetLiquorList implements Action {
  public readonly type = ActionTypes.TestLiquorApp;
  constructor(public pageSize: string, public pageNum: string, public search: string, public filter: string) { }
}

export class GetLiquorListSuccess implements Action {
  public readonly type = ActionTypes.TestLiquorAppSuccess;
  constructor(public payload: any) { }
}

export class StartConnection implements Action {
  public readonly type = ActionTypes.StartConnection;
}

export class UpdateRecieved implements Action {
  public readonly type = ActionTypes.UpdateRecieved;
  constructor(public payload: any) { }
}

export class GetLiquorById implements Action {
  public readonly type = ActionTypes.GetLiquorById;
}

export class GetLiquorByIdSuccess implements Action {
  public readonly type = ActionTypes.GetLiquorByIdSuccess;
  constructor(public payload: any) { }
}

export class Failure implements Action {
  public readonly type = ActionTypes.Failure;
  constructor(public error: any) { }
}

export type Actions = SetTitle |
  GetLiquorList |
  GetLiquorListSuccess |
  StartConnection |
  UpdateRecieved |
  GetLiquorById |
  GetLiquorByIdSuccess |
  Failure;
