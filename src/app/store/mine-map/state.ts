import { Square} from '../../models/square';
import {Setting} from '../../models/setting';

export interface State {
  setting: Setting;
  map: Square[][] ;
  remainingMines: number;
  timer: number;
  outcome?: boolean;
  errorMessage?: string;
}

export const initialState: State = {
  setting: {
    mines: 10,
    map: { x: 9, y: 9},
    timer: true
  },
  map: [],
  remainingMines: 10,
  timer: 0
}


