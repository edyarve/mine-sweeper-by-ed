import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector
} from '@ngrx/store';

import { Square } from '../../models/square';

import { State } from './state';
import {Setting} from '../../models/setting';

const getMap = (state: State): any => (state ? state.map : null);

const getSetting = (state: State): Setting => (state ? state.setting : null);

const getOutcome = (state: State): boolean => (state ? state.outcome : undefined);

const getTimer = (state: State): number => (state ? state.timer : undefined);

const getError = (state: State): string => (state ? state.errorMessage : undefined);

const getRemainingMines = (state: State): number => (state ? state.remainingMines : undefined);

export const selectMineMapState: MemoizedSelector<
  object,
  State
  > = createFeatureSelector<State>('mineMap');

export const selectOutcome: MemoizedSelector<
  object,
  boolean
  > = createSelector(selectMineMapState, getOutcome);

export const selectMineMap: MemoizedSelector<
  object,
  Square[][]
  > = createSelector(selectMineMapState, getMap);

export const selectSetting: MemoizedSelector<
  object,
  Setting
  > = createSelector(selectMineMapState, getSetting);

export const selectRemainingMines: MemoizedSelector<
  object,
  number
  > = createSelector(selectMineMapState, getRemainingMines);

export const selectTimer: MemoizedSelector<
  object,
  number
  > = createSelector(selectMineMapState, getTimer);

export const selectMineMapError: MemoizedSelector<
  object,
  string
  > = createSelector(selectMineMapState, getError);

