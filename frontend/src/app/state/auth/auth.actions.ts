import { Action } from '@ngrx/store';
import { IUser } from 'src/app/models/IUser';

export enum ActionTypes {
  LoginUser = '[Auth-APP] LoginUser',
  LoginUserSuccessful = '[Auth-APP] LoginUserSuccessful',
  Failure = '[Auth-APP] Failure',
  AuthenticateCookie = '[Auth-APP] AuthenticateCookie',
  AuthenticateCookieSuccessful = '[Auth-APP] AuthenticateCookieSuccessful',
  CheckUserExists = '[Auth-APP] CheckUserExists',
  CheckUserExistsSuccessful = '[Auth-APP] CheckUserExistsSuccessful'
}

export class LoginUser implements Action {
  public readonly type = ActionTypes.LoginUser;
  constructor(public username: string, public password: string) { }
}

export class LoginUserSuccessful implements Action {
  public readonly type = ActionTypes.LoginUserSuccessful;
  constructor(public payload: IUser) { }
}

export class AuthenticateCookie implements Action {
  public readonly type = ActionTypes.AuthenticateCookie;
}

export class AuthenticateCookieSuccessful implements Action {
  public readonly type = ActionTypes.AuthenticateCookieSuccessful;
  constructor(public payload: IUser) { }
}

export class CheckUserExists implements Action {
  public readonly type = ActionTypes.CheckUserExists;
  constructor(public username: string) { }
}

export class CheckUserExistsSuccessful implements Action {
  public readonly type = ActionTypes.CheckUserExistsSuccessful;
  constructor(public response: any) { }
}

export class Failure implements Action {
  public readonly type = ActionTypes.Failure;
  constructor(public error: any) { }
}

export type Actions = LoginUser |
  LoginUserSuccessful |
  Failure |
  AuthenticateCookie |
  AuthenticateCookieSuccessful |
  CheckUserExists |
  CheckUserExistsSuccessful;
