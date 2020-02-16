import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserData } from '../../interfaces/common/users';
import { UsersService } from './services/users.service';
import { UsersApi } from './api/users.api';
import { HttpService } from './api/http.service';
import { CountryData } from '../../interfaces/common/countries';
import { CountriesService } from './services/countries.service';
import { CountriesApi } from './api/countries.api';
import { SettingsApi } from './api/settings.api';
import { NbAuthModule } from '@nebular/auth';
import { SettingsData } from '../../interfaces/common/settings';
import { SettingsService } from './services/settings.service';
import {CompetitionsData, EventsData} from '../../interfaces/common/events';
import {EventsService} from './services/events.service';
import {EventsApi} from './api/events.api';
import {BetsData} from '../../interfaces/common/bets';
import {BetsService} from './services/bets.service';
import {BetsApi} from './api/bets.api';
import {CompetitionsApi} from './api/competitions.api';
import {CompetitionsService} from './services/competitions.service';
import {ChartsData} from '../../interfaces/common/charts';
import {AnalyticsApi} from "./api/analytics.api";
import {ChartsService} from "./services/analytics.service";


const API = [UsersApi, AnalyticsApi, CompetitionsApi,  EventsApi, BetsApi, CountriesApi, SettingsApi,  HttpService];

const SERVICES = [
  { provide: UserData, useClass: UsersService },
  { provide: EventsData, useClass: EventsService },
  { provide: CountryData, useClass: CountriesService },
  { provide: SettingsData, useClass: SettingsService },
  { provide: BetsData, useClass: BetsService },
  { provide: ChartsData, useClass: ChartsService},
  { provide: CompetitionsData, useClass: CompetitionsService },
];

@NgModule({
  imports: [CommonModule, NbAuthModule],
})

export class CommonBackendModule {
  static forRoot(): ModuleWithProviders {
    return <ModuleWithProviders>{
      ngModule: CommonBackendModule,
      providers: [
        ...API,
        ...SERVICES,
      ],
    };
  }
}
