import { ILiquor } from 'src/app/models/ILiquor';
import { ISearch } from 'src/app/models/ISearch';

export interface ILiquorAppState {
  title: string;
  data: ILiquor[];
  search: ISearch;
}
