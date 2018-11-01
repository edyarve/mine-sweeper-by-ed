import { TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import {MastheadComponent} from './components/masthead/masthead.component';
import {MapComponent} from './components/map/map.component';
import {MatDialog, MatIcon} from '@angular/material';
import {SquareComponent} from './components/map/square/square.component';
import {Store} from '@ngrx/store';

import {initialState} from './store/mine-map/state';
import {NewGameComponent} from './components/new-game/new-game.component';
import {map} from 'rxjs/operators';
import {MockMatDialog} from './components/masthead/masthead.component.spec';
import {MockStore} from './store/mine-map/store.spec';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        MastheadComponent,
        MapComponent,
        SquareComponent,
        MatIcon
      ],
      providers: [
        {provide: Store, useValue: new MockStore(initialState)},
        {provide: MatDialog, useValue: new MockMatDialog()},
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'mine-sweeper'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('mine-sweeper');
  });

});
