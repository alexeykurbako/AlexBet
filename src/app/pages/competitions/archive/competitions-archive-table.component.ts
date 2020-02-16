import {Component, OnDestroy} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {CompetitionsData} from '../../../@core/interfaces/common/events';



@Component({
  selector: 'ngx-archive-table',
  templateUrl: './competitions-archive-table.component.html',
  styleUrls: ['./competitions-archive-table.component.scss'],
})
export class CompetitionsArchiveTableComponent implements OnDestroy {

  private alive = true;

  settings = {
    mode: 'external',
    actions: {
      delete: false,
      add: false,
      edit: false,
    },
    columns: {
      category: {
        title: 'Category',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.firstTeam.category, element.firstTeam.category.name),
      },
      firstTeam: {
        title: 'First team',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.firstTeam, element.firstTeam.name),
      },
      firstTeamLeague: {
        title: 'First team league',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.firstTeam.league.name, element.firstTeam.league.name),
      },
      firstTeamResult: {
        title: 'First team result',
        type: 'number',
        filter: false,
        sort: false,
      },
      secondTeam: {
        title: 'Second Team',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.secondTeam, element.secondTeam.name),
      },
      secondTeamLeague: {
        title: 'Second team league',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.secondTeam.league.name, element.secondTeam.league.name),
      },
      secondTeamResult: {
        title: 'Second team result',
        type: 'number',
        filter: false,
        sort: false,
      },
    },
  };

  source: DataSource;

  constructor(private competitionsService: CompetitionsData) {
    this.loadData();
  }

  loadData() {
    this.source = this.competitionsService.finishedCompetitionsDataSource;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private customDisplay(conditionValue: any, displayValue: string) {
    return conditionValue ? displayValue : '';
  }
}
