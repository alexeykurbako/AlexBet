import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { ThemeModule } from '../../@theme/theme.module';
import { ComponentsModule } from '../../@components/components.module';
// components

import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule, NbCheckboxModule,
} from '@nebular/theme';
import {BetComponent} from '../bet/bet.component';
import {EventsTableComponent} from './events-table.component';
import {EventsRoutingModule} from './events-routing.module';
import {EventsComponent} from './events.component';
import {CountdownModule} from 'ng2-date-countdown';
import {BetsTableComponent} from "../bet/bets/bets-table.component";

const  NB_MODULES = [
  NbActionsModule,
  NbButtonModule,
  NbCardModule,
  NbInputModule,
  NbTabsetModule,
  NbRadioModule,
  NbSelectModule,
  NbListModule,
  NbIconModule,
  NbSpinnerModule,
  NbDatepickerModule,
  NbInputModule,
];

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    EventsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    CountdownModule,
    ...NB_MODULES,
    FormsModule,
  ],
  declarations: [
    EventsComponent,
    EventsTableComponent,
    BetsTableComponent,
    BetComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class EventsModule { }
