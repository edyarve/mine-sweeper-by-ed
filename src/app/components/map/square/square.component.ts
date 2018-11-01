import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Square, UserSquare} from '../../../models/square';

import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'mine-square',
  animations: [
    trigger('step', [
      state('digit', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('mine', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      state('empty', style({
        opacity: 1,
        transform: 'scale(1)'
      })),
      transition('* => mine', [
        animate('1.5s')
      ]),
      transition('* => digit', [
        animate('2s')
      ]),
      transition('* => empty', [
        animate('1s')
      ]),
    ]),
  ],
  templateUrl: './square.component.html',
  styleUrls: ['./square.component.scss'],
})
export class SquareComponent implements OnInit {

  Action = UserSquare;

  @Input()
    square: Square;

  @Input()
    disabled = false;

  @Output()
    step = new EventEmitter();

  @Output()
    mark = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onMark() {
    this.mark.emit();
    return false;
  }
}
