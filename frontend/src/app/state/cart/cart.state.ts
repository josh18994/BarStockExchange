import { LiquorInfo } from 'src/app/models/ILiquor';

export interface ICartState {
  liquor: LiquorInfo[];
  total: string;
  busy: boolean;
}
