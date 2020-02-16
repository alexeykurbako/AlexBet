import {Injectable} from '@angular/core';
import {Category, Competition, CompetitionsData, Team} from '../../../interfaces/common/events';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Observable} from 'rxjs';
import {CompetitionsApi} from '../api/competitions.api';

@Injectable()
export class CompetitionsService extends CompetitionsData {
  constructor(private api: CompetitionsApi) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.activeCompetitionsDataSource;
  }

  get finishedCompetitionsDataSource(): DataSource {
    return this.api.finishedCompetitionsDataSource;
  }


  get(id: number): Observable<Competition> {
    return this.api.get(id);
  }

  getCategories(): Observable<Category[]> {
    return this.api.getCategories();
  }

  getTeamsByCategoryName(category: string): Observable<Team[]> {
    return this.api.getTeams(category);
  }

  add(competition: Competition, duration: number): Observable<Competition> {
    return this.api.add(competition, duration);
  }

  finish(competition: Competition): Observable<Competition> {
    return this.api.finish(competition);
  }


}
