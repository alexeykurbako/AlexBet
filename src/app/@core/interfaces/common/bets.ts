import {Event, Team} from './events';
import {User} from './users';
import {Observable} from 'rxjs';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';

export interface Bet {
  id: number;
  team: Team;
  user: User;
  event: Event;
  size: number;
  status: string;
  wasPayed: string;
}

export abstract class BetsData {
  abstract get(id: number);
  abstract create(bet: Bet): Observable<Bet>;
  abstract gridDataSource(id: number): DataSource;
}
