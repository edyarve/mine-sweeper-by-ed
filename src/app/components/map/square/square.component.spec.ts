import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SquareComponent} from './square.component';
import {MatIcon} from '@angular/material';
import {Square, UserSquare} from '../../../models/square';

describe('SquareComponent', () => {
  let component: SquareComponent;
  let fixture: ComponentFixture<SquareComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SquareComponent,
        MatIcon
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SquareComponent);
    component = fixture.componentInstance;

    const square: Square = {
      bomb: false,
      action: UserSquare.NONE,
      touchingBombs: 1
    };
    component.square = square;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
