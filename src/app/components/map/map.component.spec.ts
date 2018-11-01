import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import {SquareComponent} from './square/square.component';
import {MatIcon} from '@angular/material';
import {Store} from '@ngrx/store';
import {initialState} from '../../store/mine-map/state';
import {MockStore} from '../../store/mine-map/store.spec';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MapComponent,
        SquareComponent,
        MatIcon
      ],
      providers: [
        {provide: Store, useValue: new MockStore(initialState)},
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
