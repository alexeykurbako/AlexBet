
import { NgModule } from '@angular/core';
import { StarterMenuComponent } from './starter.component';
import {BarChartComponent} from "./teams-chart.component";
import {NbCardModule} from "@nebular/theme";
import {ChartsModule} from "ng2-charts";


@NgModule({
  imports: [
    NbCardModule,
    ChartsModule,
  ],
    declarations: [StarterMenuComponent, BarChartComponent],
  })

export class StarterMenuModule { }
