import {Event, EventsData} from '../../../interfaces/common/events';
import {Injectable} from '@angular/core';
import {EventsApi} from '../api/events.api';
import {Observable} from 'rxjs';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';


@Injectable()
export class EventsService extends EventsData {
  constructor(private api: EventsApi) {
    super();
  }

  get gridDataSource(): DataSource {
    return this.api.eventsDataSource;
  }

  get(id: number): Observable<Event> {
    return this.api.get(id);
  }
}
