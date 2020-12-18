import { Action } from '@ngrx/store';


export enum ActionTypes {
  TestLiquorApp = '[LIQUOR-APP] TestLiquorApp',
  TestLiquorAppSuccess = '[LIQUOR-APP] TestLiquorAppSuccess',
  StartConnection = '[LIQUOR-APP] StartConnection',
  UpdateRecieved = '[LIQUOR-APP] UpdateRecieved',
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

export type Actions = TestLiquorApp |
  TestLiquorAppSuccess |
  StartConnection |
  UpdateRecieved;
