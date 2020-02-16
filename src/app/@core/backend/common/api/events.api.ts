import {Injectable} from '@angular/core';
import {HttpService} from './http.service';
import {Observable} from 'rxjs';
import {Event} from '../../../interfaces/common/events';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';

@Injectable()
export class EventsApi {
  private readonly apiController: string = 'events';

  constructor(private api: HttpService) {
  }

  get eventsDataSource(): DataSource {
    return this.api.getServerDataSource(`${this.api.apiUrl}/${this.apiController}`);
  }

  get(id: number): Observable<Event> {
    return this.api.get(`${this.apiController}/${id}`);
  }
}
