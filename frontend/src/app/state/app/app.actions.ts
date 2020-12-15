import { Action } from '@ngrx/store';
import { ILiquor } from 'src/app/models/ILiquor';


export enum ActionTypes {
  TestLiquorApp = '[LIQUOR-APP] TestLiquorApp',
  TestLiquorAppSuccess = '[LIQUOR-APP] TestLiquorAppSuccess'
}

export class TestLiquorApp implements Action {
  public readonly type = ActionTypes.TestLiquorApp;
}

export class TestLiquorAppSuccess implements Action {
  public readonly type = ActionTypes.TestLiquorAppSuccess;
  constructor(public payload: any) { }
}

export type Actions = TestLiquorApp |
  TestLiquorAppSuccess;
