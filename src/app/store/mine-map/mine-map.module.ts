import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {featureReducer} from './reducer';
import {MineMapStoreEffects} from './effects';

@NgModule({
  imports: [
    CommonModule,
    StoreModule.forFeature('mineMap', featureReducer),
    EffectsModule.forFeature([MineMapStoreEffects])
  ],
  declarations: []
})
export class MineMapModule { }
