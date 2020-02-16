import {Injectable} from "@angular/core";

import {ChartsData, TeamsChart} from "../../../interfaces/common/charts";
import {AnalyticsApi} from "../api/analytics.api";
import {Observable} from "rxjs";


@Injectable()
export class ChartsService extends ChartsData {
  constructor(private api: AnalyticsApi) {
    super();
  }

  getTeamsChartData(): Observable<TeamsChart> {
    return this.api.teamsChart;
  }
}
