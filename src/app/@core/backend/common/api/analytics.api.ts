import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {TeamsChart} from '../../../interfaces/common/charts';


@Injectable()
export class AnalyticsApi {
  private readonly apiController: string = 'analytics';

  constructor(private api: HttpService) {
  }

  get teamsChart(): Observable<TeamsChart> {
    return this.api.get(`${this.apiController}/teams`);
  }
}
