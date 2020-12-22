import { IUser } from 'src/app/models/IUser';

export interface IAuthState {
  user: IUser;
  loading: boolean;
  error: any[];
}
