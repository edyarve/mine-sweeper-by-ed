import {Component, OnInit} from '@angular/core';
import {Setting} from '../../models/setting';
import {Square, UserSquare} from '../../models/square';
import {select, Store} from '@ngrx/store';
import {
  RootStoreState,
  MineMapStoreActions,
  MineMapStoreSelectors
} from '../../store/root';

import {Observable} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'mine-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  animations: [
    trigger('winner', [
      state('win', style({
        filter: 'blur(1px)',
        transform: 'scale(5.5)',
        marginLeft: '40%',
        color: '#ffbc31',
        marginTop: '20%'
      })),
      transition('* => win', [
        animate('2s')
      ]),
    ]),
  ]
})
export class MapComponent implements OnInit {

  map$: Observable<Square[][]>;
  outcome$: Observable<boolean>;

  constructor(private store$: Store<RootStoreState.State>) { }

  ngOnInit() {
    this.map$ = this.store$.pipe(
      select(MineMapStoreSelectors.selectMineMap)
    );

    this.outcome$ = this.store$.pipe(
      select(MineMapStoreSelectors.selectOutcome)
    );

    this.store$.dispatch(
      new MineMapStoreActions.LoadMapAction()
    );
  }

  onStep(x: number, y: number) {
    this.store$.dispatch(
      new MineMapStoreActions.StepAction(x, y)
    );
  }

  onMark(x: number, y: number) {
    this.store$.dispatch(
      new MineMapStoreActions.MarkAction(x, y)
    );
  }
}
