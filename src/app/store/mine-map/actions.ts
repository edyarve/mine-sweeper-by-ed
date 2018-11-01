import { Action } from '@ngrx/store';
import {MineMapWithOutcome, Square} from '../../models/square';
import {Setting} from '../../models/setting';

export enum ActionTypes {
  LOAD_MAP = '[Mine Map] Load Map',
  LOAD_MAP_WITH_SETTING = '[Mine Map] Load Map with setting',
  LOAD_MAP_FAILURE = '[Mine Map] Load Map Failure',
  LOAD_MAP_SUCCESS = '[Mine Map] Load MapSuccess',

  STEP = '[Mine Map] Step',
  STEP_FAILURE = '[Mine Map] Step Failure',
  STEP_SUCCESS = '[Mine Map] Step Success',

  MARK = '[Mine Map] MARK',
  MARK_FAILURE = '[Mine Map] MARK Failure',
  MARK_SUCCESS = '[Mine Map] MARK Success'

}

export class LoadMapAction implements Action {
  readonly type = ActionTypes.LOAD_MAP;
  constructor() {}
}

export class LoadMapWithSettingAction implements Action {
  readonly type = ActionTypes.LOAD_MAP_WITH_SETTING;
  constructor(public setting: Setting) {}
}

export class LoadMapFailureAction implements Action {
  readonly type = ActionTypes.LOAD_MAP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class LoadMapSuccessAction implements Action {
  readonly type = ActionTypes.LOAD_MAP_SUCCESS;
  constructor(public payload: MineMapWithOutcome) {}
}

export class StepAction implements Action {
  readonly type = ActionTypes.STEP;
  constructor(public x: number, public y: number) {}
}

export class StepFailureAction implements Action {
  readonly type = ActionTypes.STEP_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class StepSuccessAction implements Action {
  readonly type = ActionTypes.STEP_SUCCESS;
  constructor(public payload: MineMapWithOutcome) {}
}

export class MarkAction implements Action {
  readonly type = ActionTypes.MARK;
  constructor(public x: number, public y: number) {}
}

export class MarkFailureAction implements Action {
  readonly type = ActionTypes.MARK_FAILURE;
  constructor(public payload: { error: string }) {}
}

export class MarkSuccessAction implements Action {
  readonly type = ActionTypes.MARK_SUCCESS;
  constructor(public payload: MineMapWithOutcome) {}
}

export type MineMapStoreActions =
  LoadMapAction
  | LoadMapWithSettingAction
  | LoadMapFailureAction
  | LoadMapSuccessAction
  | StepAction
  | StepFailureAction
  | StepSuccessAction
  | MarkAction
  | MarkFailureAction
  | MarkSuccessAction
  ;
