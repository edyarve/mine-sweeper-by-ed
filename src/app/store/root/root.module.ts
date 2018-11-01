import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MineMapModule } from '../mine-map/mine-map.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';

@NgModule({
  imports: [
    CommonModule,
    MineMapModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument()
  ],
  declarations: []
})
export class RootModule { }
