import {Component, NgModule} from '@angular/core';
import {
  NbActionsModule,
  NbButtonModule,
  NbCardModule, NbDatepickerModule, NbIconModule,
  NbInputModule, NbListModule,
  NbRadioModule, NbSelectModule, NbSpinnerModule,
  NbTabsetModule,
} from '@nebular/theme';
import {ThemeModule} from '../../@theme/theme.module';
import {Ng2SmartTableModule} from 'ng2-smart-table';
import {ComponentsModule} from '../../@components/components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CompetitionsComponent} from './competitions.component';
import {CompetitionsRoutingModule} from './competitions-routing.module';
import {CompetitionsTableComponent} from './competitions-table.component';
import {FinishCompetitionComponent} from './finish-component/finish.component';
import {AddCompetitionComponent} from './add-competition/add.component';
import {CompetitionsArchiveTableComponent} from './archive/competitions-archive-table.component';

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
    CompetitionsRoutingModule,
    ComponentsModule,
    ReactiveFormsModule,
    ...NB_MODULES,
    FormsModule,
  ],
  declarations: [
    CompetitionsComponent,
    FinishCompetitionComponent,
    AddCompetitionComponent,
    CompetitionsTableComponent,
    CompetitionsArchiveTableComponent,
  ],
  entryComponents: [
  ],
  providers: [],
})
export class CompetitionsModule { }

