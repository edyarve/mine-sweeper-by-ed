import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { MastheadComponent } from './masthead.component';
import {MatDialog, MatIcon} from '@angular/material';
import {Store} from '@ngrx/store';
import {initialState} from '../../store/mine-map/state';
import {MockStore} from '../../store/mine-map/store.spec';
import {of} from 'rxjs';
import {setTimeout} from 'timers';

export class MockMatDialog {
  // When the component calls this.dialog.open(...) we'll return an object
  // with an afterClosed method that allows to subscribe to the dialog result observable.
  open() {
    return {
      afterClosed: () => of(initialState.setting)
    };
  }
}

/**
 * Page object fot the masthead
 */
export class Page {
  // getter properties wait to query the DOM until called.
  // get menu( return ) {return }
  //
  get timer() { return this.query<HTMLElement>('#timer'); }
  get mines() { return this.query<HTMLElement>('#mines'); }

  constructor(private fixture: ComponentFixture<MastheadComponent>) {
  }

  // These query helpers actually should be placed in a base class.
   query<T>(selector: string): T {
    return this.fixture.nativeElement.querySelector(selector);
  }

  queryAll<T>(selector: string): T[] {
    return this.fixture.nativeElement.querySelectorAll(selector);
  }
}

describe('MastheadComponent', () => {
  let component: MastheadComponent;
  let fixture: ComponentFixture<MastheadComponent>;
  let page: Page;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MastheadComponent,
        MatIcon
      ],
      providers: [
        {provide: Store, useValue: new MockStore(initialState)},
        {provide: MatDialog, useValue: new MockMatDialog()},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MastheadComponent);
    component = fixture.componentInstance;
    page = new Page(fixture);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // This test currently fails. We need to add to our MockStore the value of currently discovered mines
  // and be able to emit this thought selectors.
  it('should be ' + initialState.setting.mines + ' mines', () => {
    fixture.detectChanges(); // update view
    expect(page.timer.innerText).toBe(initialState.setting.mines.toString());
  });

  // This test currently fails. It requires adding async check if the timer is counting every 1 second.
  // It can be done either with jasmin marbles or with spy and fakeAsync.
  it('timer should be counting',  () => {
    fixture.detectChanges(); // update view
    expect(new Date()).toBe(new Date());

    expect(page.mines.innerText).toBe('1');

  });
});
