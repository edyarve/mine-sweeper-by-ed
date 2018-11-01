import {Component, EventEmitter, Inject, Input, OnInit, Output} from '@angular/core';
import {Setting} from '../../models/setting';
import {ErrorStateMatcher, MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {FormControl, FormGroup, FormGroupDirective, NG_VALIDATORS, NgForm, ValidationErrors, Validators} from '@angular/forms';
import {AbstractControl} from '@angular/forms/src/model';

@Component({
  selector: 'mine-new-game',
  templateUrl: './new-game.component.html',
  styleUrls: ['./new-game.component.scss'],
})
export class NewGameComponent implements OnInit {
  MINE_ERROR = 'Mine count should be less than Height * Width';

  readonly MaxSize = 49;
//  mineMatcher: MineErrorStateMatcher;
  sizeForm = new FormGroup({
    mines: new FormControl(this.data.mines, [Validators.required, Validators.min(1),
    ]),

    height: new FormControl(this.data.map.x, [Validators.required, Validators.min(1),
      Validators.max(this.MaxSize)
    ]),

    width: new FormControl(this.data.map.y, [Validators.required, Validators.min(1),
      Validators.max(this.MaxSize)
    ])
  }, {validators: (control: FormGroup): ValidationErrors | null => {
    const isInvalid = control.value.mines > control.value.width * control.value.height;
    return (isInvalid ? { totalMax: true} : null);
  }});

  constructor(
    public dialogRef: MatDialogRef<NewGameComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Setting) {
  }

  ngOnInit() {
//    this.mineMatcher = new MineErrorStateMatcher(this.data);
  }

  onNewGame(): void {
    this.dialogRef.close({
      mines: this.sizeForm.value.mines,
      map: {
        y: this.sizeForm.value.width,
        x: this.sizeForm.value.height
      }
    });
  }

  getErrorMessage(controlName: string) {
    return this.sizeForm.get(controlName).hasError('required') ? 'You must enter a value' :
      this.sizeForm.get(controlName).hasError('max') ? 'should less than 50' :
        this.sizeForm.get(controlName).hasError('min') ? 'Must be grater than 0' :
          this.sizeForm.hasError('totalMax') ? 'Mines < Width * Height' :
      '';
  }
  getFormErrorMessage(controlName: string) {
    return this.sizeForm.hasError('totalMax') ? 'Mines < Width * Height' :  '';
  }

}
