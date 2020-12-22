import { IUser } from 'src/app/models/IUser';
import { IValidate } from 'src/app/models/IValidate';

export interface IAuthState {
  user: IUser;
  loading: boolean;
  error: any[];
  validate: IValidate;
}
