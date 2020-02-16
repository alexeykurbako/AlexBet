import {Injectable} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Observable} from 'rxjs';
import {Bet, BetsData} from '../../../interfaces/common/bets';
import {BetsApi} from '../api/bets.api';

@Injectable()
export class BetsService extends BetsData {
  constructor(private api: BetsApi) {
    super();
  }

  gridDataSource(id: number): DataSource {
    return this.api.betsDataSource(id);
  }

  get(id: number): Observable<Bet> {
    return this.api.get(id);
  }

  create(bet: Bet): Observable<Bet> {
    return this.api.add(bet);
  }
}
