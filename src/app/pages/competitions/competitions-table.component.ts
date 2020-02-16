import {Component, OnDestroy} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {CompetitionsData} from '../../@core/interfaces/common/events';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';

@Component({
  selector: 'ngx-competitions-table',
  templateUrl: './competitions-table.component.html',
  styleUrls: ['./competitions-table.component.scss'],
})
export class CompetitionsTableComponent implements OnDestroy {

  private alive = true;

  settings = {
    mode: 'external',
    actions: {
      delete: false,
    },
    edit: {
      editButtonContent: '<label class="finish-button">finish</label>',
    },
    add: {
      addButtonContent: '<label class="add-button">Add competition</label>',
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
    },
  };

  source: DataSource;

  constructor(private competitionsService: CompetitionsData,
              private router: Router,
              private toastrService: NbToastrService) {
    this.loadData();
  }

  loadData() {
    this.source = this.competitionsService.gridDataSource;
  }

  ngOnDestroy() {
    this.alive = false;
  }

  private customDisplay(conditionValue: any, displayValue: string) {
    return conditionValue ? displayValue : '';
  }

  finish($event: any) {
    this.router.navigate([`/pages/competitions/finish/${$event.data.id}`]);
  }

  add() {
    this.router.navigate([`/pages/competitions/add/`]);
  }
}
