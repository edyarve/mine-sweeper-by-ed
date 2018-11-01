import {Setting} from '../../models/setting';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Action} from '@ngrx/store';
import {Observable} from 'rxjs/Observable';
import {map} from 'rxjs/operators';

/**
 * This a mock up store for unit tests and e2e tests.
 */
export class MockStore<T> extends BehaviorSubject<T> {
  constructor(private _initialState: T) {
    super(_initialState);
  }
  dispatch = (action: Action): void => {
  }

  select = <T, R>(pathOrMapFn: any, ...paths: string[]): Observable<R> => {
    return map.call(this, pathOrMapFn);
  }
}

describe('Mine Map Store', () => {
  const setting1: Setting = {
    mines: 10,
    map: { x: 9, y: 9},
    timer: true
  };

});
