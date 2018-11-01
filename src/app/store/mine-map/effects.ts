import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import {Action, Store} from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {catchError, map, startWith, switchMap, withLatestFrom} from 'rxjs/operators';
import * as featureActions from './actions';
import {generateMineMap, mark, step} from '../../models/mine-map.util';
import * as RootStoreState from '../root/state';

@Injectable()
export class MineMapStoreEffects {
  constructor(private store$: Store<RootStoreState.State>, private actions$: Actions) {}

  @Effect()
  loadMineMapEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadMapAction>(
      featureActions.ActionTypes.LOAD_MAP
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store]) =>
      of(generateMineMap(store.mineMap.setting))
        .pipe(
          map(
            mineMapwithOutcome =>
              new featureActions.LoadMapSuccessAction(
                mineMapwithOutcome
              )
          ),
          catchError(error =>
            of(new featureActions.LoadMapFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  loadMineMapWithSettingEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.LoadMapWithSettingAction>(
      featureActions.ActionTypes.LOAD_MAP_WITH_SETTING
    ),
    withLatestFrom(this.store$),
    switchMap(([action, store]) =>
      of(generateMineMap(store.mineMap.setting))
        .pipe(
          map(
            mineMapwithOutcome =>
              new featureActions.LoadMapSuccessAction(
                mineMapwithOutcome
              )
          ),
          catchError(error =>
            of(new featureActions.LoadMapFailureAction({ error }))
          )
        )
    )
  );

  @Effect()
  StepEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.StepAction>(
      featureActions.ActionTypes.STEP
    ),
    withLatestFrom(this.store$),
    switchMap( ([action, store]) =>
      of(step(action.x, action.y, store.mineMap.map, store.mineMap.setting))
        .pipe(
          map(
            mineMapwithOutcome =>
              new featureActions.StepSuccessAction(
                mineMapwithOutcome
              )
          ),
          catchError(error =>
            of(new featureActions.LoadMapFailureAction({ error }))
          )
        )
    )
  );
  @Effect()
  MarkEffect$: Observable<Action> = this.actions$.pipe(
    ofType<featureActions.MarkAction>(
      featureActions.ActionTypes.MARK
    ),
    withLatestFrom(this.store$),
    switchMap( ([action, store]) =>
      of(mark(action.x, action.y, store.mineMap.map, store.mineMap.setting)).pipe(
        map(
          mineMapwithOutcome =>
            new featureActions.MarkSuccessAction(
              mineMapwithOutcome
            )
        ),
        catchError(error =>
          of(new featureActions.LoadMapFailureAction({ error }))
        )
      )
    )
  );
}
