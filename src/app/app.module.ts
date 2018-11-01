import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { SquareComponent } from './components/map/square/square.component';
import { MastheadComponent } from './components/masthead/masthead.component';
import { NewGameComponent } from './components/new-game/new-game.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule, MatChipsModule, MatDialogModule,
  MatDividerModule, MatFormFieldModule, MatIconModule,
  MatInputModule, MatMenuModule,
  MatSlideToggleModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {RootModule} from './store/root/root.module';

@NgModule({
  entryComponents: [
    NewGameComponent
  ],
  declarations: [
    AppComponent,
    MapComponent,
    SquareComponent,
    MastheadComponent,
    NewGameComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RootModule,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatChipsModule
  ],
  exports: [
    MatSlideToggleModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatDividerModule,
    MatButtonToggleModule,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    MatChipsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
