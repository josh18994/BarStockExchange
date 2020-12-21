import { Action } from '@ngrx/store';


export enum ActionTypes {
  TestLiquorApp = '[LIQUOR-APP] TestLiquorApp',
  TestLiquorAppSuccess = '[LIQUOR-APP] TestLiquorAppSuccess',
  StartConnection = '[LIQUOR-APP] StartConnection',
  UpdateRecieved = '[LIQUOR-APP] UpdateRecieved',
  GetLiquorById = '[LIQUOR-APP] GetLiquorById',
  GetLiquorByIdSuccess = '[LIQUOR-APP] GetLiquorByIdSuccess',
  Failure = '[LIQUOR-APP] Failure',
  AuthenticateCookie = '[LIQUOR-APP] AuthenticateCookie',
  AuthenticateCookieSuccessful = '[LIQUOR-APP] AuthenticateCookieSuccessful'
}

export class TestLiquorApp implements Action {
  public readonly type = ActionTypes.TestLiquorApp;
}

export class TestLiquorAppSuccess implements Action {
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

export class AuthenticateCookie implements Action {
  public readonly type = ActionTypes.AuthenticateCookie;
}

export class AuthenticateCookieSuccessful implements Action {
  public readonly type = ActionTypes.AuthenticateCookieSuccessful;
  constructor(public payload: any) { }
}

export class Failure implements Action {
  public readonly type = ActionTypes.Failure;
  constructor(public error: any) { }
}

export type Actions = TestLiquorApp |
  TestLiquorAppSuccess |
  StartConnection |
  UpdateRecieved |
  GetLiquorById |
  GetLiquorByIdSuccess |
  Failure |
  AuthenticateCookie |
  AuthenticateCookieSuccessful;
