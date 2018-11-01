import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatFormFieldModule, MatInputModule, MatTabsModule, MatOptionModule, MatSelectModule, MatCardModule,
  MatNativeDateModule, MatProgressSpinnerModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatDatepickerModule} from '@angular/material/datepicker';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatToolbarModule,
    MatListModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatDialogModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule
  ],

  exports: [
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTabsModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCheckboxModule,
    MatSlideToggleModule,
    MatStepperModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule]
  ,
  declarations: []
})
export class TestModule {
}
