import {Observable} from 'rxjs';

export interface TeamsChart {
  axisLabels: string[];
  data: number[];
}

export abstract class ChartsData {
  abstract getTeamsChartData(): Observable<TeamsChart>;
}
