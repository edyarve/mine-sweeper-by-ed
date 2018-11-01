import { MineMapStoreActions, ActionTypes } from './actions';
import { initialState, State } from './state';
import {timer} from 'rxjs';

export function featureReducer(state = initialState, action: MineMapStoreActions): State {
  switch (action.type) {
    case ActionTypes.LOAD_MAP_WITH_SETTING:
      return {
        ...state,
        map: state.map,
        remainingMines: state.remainingMines,
        timer: state.timer,
        outcome: state.outcome,
        errorMessage: null,
        setting: action.setting
      };
    case ActionTypes.STEP:
    case ActionTypes.MARK:
    case ActionTypes.LOAD_MAP:
      return {
        ...state,
        map: state.map,
        remainingMines: state.remainingMines,
        timer: state.timer,
        outcome: state.outcome,
        errorMessage: null,
        setting: state.setting
      };
    case ActionTypes.LOAD_MAP_SUCCESS:
    case ActionTypes.STEP_SUCCESS:
    case ActionTypes.MARK_SUCCESS:
      return {
        ...state,
        map: action.payload.mineMap,
        remainingMines: action.payload.remainingMines,
        timer: state.timer,
        outcome: action.payload.outcome,
        setting: state.setting,
        errorMessage: null
      };
    case ActionTypes.STEP_FAILURE:
    case ActionTypes.MARK_FAILURE:
    case ActionTypes.LOAD_MAP_FAILURE:
      return {
        ...state,
        map: state.map,
        remainingMines: state.remainingMines,
        timer: state.timer,
        outcome: state.outcome,
        setting: state.setting,
        errorMessage: action.payload.error
      };
    default: {
      return state;
    }
  }
}
