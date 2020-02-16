import {Component, OnDestroy} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {EventsData} from '../../@core/interfaces/common/events';

@Component({
  selector: 'ngx-events-table',
  templateUrl: './events-table.component.html',
  styleUrls: ['./events-table.component.scss'],

})
export class EventsTableComponent implements OnDestroy {

  private alive = true;

  settings = {
    mode: 'external',
    actions: {
      delete: false,
      add: false,
    },
    edit: {
      editButtonContent: '<label class="bet-button">create bet</label>',
    },
    columns: {
      category: {
        title: 'Category',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.competition.firstTeam.category, element.competition.firstTeam.category.name),
      },
      firstTeam: {
        title: 'First team',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.competition.firstTeam, element.competition.firstTeam.name),
      },
      firstTeamCoefficient: {
        title: 'First coefficient',
        type: 'string',
        filter: false,
        sort: false,
      },
      secondTeam: {
        title: 'Second Team',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.competition.secondTeam, element.competition.secondTeam.name),
      },
      secondTeamCoefficient: {
        title: 'Second coefficient',
        type: 'string',
        filter: false,
        sort: false,
      },
    },
  };

  source: DataSource;

  constructor(private eventsService: EventsData, private router: Router,
              private toastrService: NbToastrService) {
    this.loadData();
  }

  loadData() {
    this.source = this.eventsService.gridDataSource;
  }

  onBet($event: any) {
    this.router.navigate([`/pages/events/bet/${$event.data.id}`]);
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private customDisplay(conditionValue: any, displayValue: string) {
    return conditionValue ? displayValue : '';
  }
}
