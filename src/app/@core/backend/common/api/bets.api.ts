import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Observable} from 'rxjs';
import {Bet} from '../../../interfaces/common/bets';

@Injectable()
export class BetsApi {
  private readonly apiController: string = 'bets';

  constructor(private api: HttpService) {
  }

  betsDataSource(id: number): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}/${id}`);
  }

  get(id: number): Observable<Bet> {
    return this.api.get(`${this.apiController}/${id}`);
  }

  add(item: Bet): Observable<Bet> {
    return this.api.post(this.apiController, item);
  }
}
