import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Observable} from 'rxjs';
import {Category, Competition, Team} from '../../../interfaces/common/events';

@Injectable()
export class CompetitionsApi {
  private readonly apiController: string = 'competitions';

  constructor(private api: HttpService) {
  }

  get activeCompetitionsDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}/active`);
  }

  get finishedCompetitionsDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}/finished`);
  }

  get(id: number): Observable<Competition> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  getCategories(): Observable<Category[]> {
    return this.api.get(`${this.apiController}/categories`);
  }

  getTeams(category: string): Observable<Team[]> {
    return this.api.get(`${this.apiController}/teams/${category}`);
  }

  add(competition: Competition, duration: number): Observable<Competition> {
    return this.api.post(`${this.apiController}/create/${duration}`, competition);
  }

  finish(competition: Competition): Observable<Competition> {
    return this.api.put(`${this.apiController}/finish`, competition);
  }
}
