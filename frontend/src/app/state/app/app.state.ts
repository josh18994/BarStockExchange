import { ILiquor } from 'src/app/models/ILiquor';

export interface ILiquorAppState {
  title: string;
  data: ILiquor[];
  inventoryTotal: string;
}
