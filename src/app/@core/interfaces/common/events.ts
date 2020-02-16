import {Observable} from 'rxjs';
import DateTimeFormat = Intl.DateTimeFormat;
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Event {
  id: number;
  competition: Competition;
  firstTeamCoefficient: number;
  secondTeamCoefficient: number;
  startTime: Date;
  endTime: Date;
}

export interface Competition {
  id: number;
  firstTeam: Team;
  secondTeam: Team;
  status: string;
  firstTeamResult: number;
  secondTeamResult: number;
}

export interface Team {
  id: number;
  name: string;
  league: League;
  category: Category;
}

export interface League {
  id: number;
  name: string;
}

export interface Category {
  id: number;
  name: string;
}

export abstract class EventsData {
  abstract get gridDataSource(): DataSource;
  abstract get(id: number);
}

export abstract class CompetitionsData {
  abstract get gridDataSource(): DataSource;
  abstract get finishedCompetitionsDataSource(): DataSource;
  abstract get(id: number);
  abstract finish(competition: Competition): Observable<Competition>;
  abstract getCategories(): Observable<Category[]>;
  abstract getTeamsByCategoryName(category: string): Observable<Team[]>;
  abstract add(competition: Competition, duration: number): Observable<Competition>;
}
