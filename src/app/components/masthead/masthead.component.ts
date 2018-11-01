import {Component, OnDestroy, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {
  RootStoreState,
  MineMapStoreActions,
  MineMapStoreSelectors
} from '../../store/root';
import {Observable, Subscriber, Subscription, timer} from 'rxjs';
import {Setting} from '../../models/setting';
import {MatDialog} from '@angular/material';
import {NewGameComponent} from '../new-game/new-game.component';
import {map, skip, skipWhile, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'mine-masthead',
  templateUrl: './masthead.component.html',
  styleUrls: ['./masthead.component.scss']
})
export class MastheadComponent implements OnInit, OnDestroy {

  remainingMines$: Observable<number>;
  // timer$: Observable<number>;
  outcome$: Observable<boolean>;
  setting$: Observable<Setting>;
  timer$: Observable<number>;

  settingSubscription: Subscription;


  constructor(private store$: Store<RootStoreState.State>, public dialog: MatDialog) { }

  ngOnInit() {
    this.remainingMines$ = this.store$.pipe(
      select(MineMapStoreSelectors.selectRemainingMines)
    );
    this.outcome$ = this.store$.pipe(
      select(MineMapStoreSelectors.selectOutcome)
    );
    this.setting$ = this.store$.pipe(
      select(MineMapStoreSelectors.selectSetting)
    );
    this.setTimer();
  }

  openSettings(): void {
    this.settingSubscription = this.setting$.pipe(take(1))
      .subscribe(setting => {
        const dialogRef = this.dialog.open(NewGameComponent, {
          width: '250px',
          data: setting
        });

        dialogRef.afterClosed().subscribe(newSetting => {
          if (newSetting) {
            this.timer$ = timer(0, 1000);
            this.setTimer();
            this.store$.dispatch(
              new MineMapStoreActions.LoadMapWithSettingAction(newSetting)
            );
          }
        });
      });
  }
  newGame() {
    this.setTimer();
    this.store$.dispatch(
      new MineMapStoreActions.LoadMapAction()
    );
  }

  // this function set the timer which emits the numbers until outcome$ emits true or false (
  setTimer() {
    this.timer$ = timer(0, 1000)
      .pipe(takeUntil(this.outcome$.pipe(skipWhile(outcome =>
        outcome === undefined))));
  }

  ngOnDestroy() {
    if (this.settingSubscription) {
      this.settingSubscription.unsubscribe();
    }
  }
}
