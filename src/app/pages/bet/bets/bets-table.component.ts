import {Component, OnDestroy} from '@angular/core';
import {DataSource} from 'ng2-smart-table/lib/lib/data-source/data-source';
import {Router} from '@angular/router';
import {NbToastrService} from '@nebular/theme';
import {BetsData} from '../../../@core/interfaces/common/bets';
import {UserData} from "../../../@core/interfaces/common/users";
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";

@Component({
  selector: 'ngx-bets-table',
  templateUrl: './bets-table.component.html',
  styleUrls: ['./bets-table.component.scss'],

})
export class BetsTableComponent implements OnDestroy {

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
          this.customDisplay(element.event.competition.firstTeam.category,
                          element.event.competition.firstTeam.category.name),
      },
      firstTeam: {
        title: 'Team',
        type: 'string',
        filter: false,
        sort: false,
        valuePrepareFunction: (cell, element) =>
          this.customDisplay(element.team, element.team.name),
      },
      size: {
        title: 'Size',
        type: 'number',
        filter: false,
        sort: false,
      },
      status: {
        title: 'Status',
        type: 'string',
        filter: true,
        sort: true,
      },
    },
  };

  protected readonly unsubscribe$ = new Subject<void>();

  source: DataSource;

  constructor(private betsService: BetsData, private router: Router,
              private usersSerive: UserData,
              private toastrService: NbToastrService) {
    this.loadData();
  }

  loadData() {
    this.usersSerive.getCurrentUser().pipe().pipe(takeUntil(this.unsubscribe$))
      .subscribe(user => {
        this.source = this.betsService.gridDataSource(+user.id);
      })

  }

  ngOnDestroy() {
    this.alive = false;
  }

  private customDisplay(conditionValue: any, displayValue: string) {
    return conditionValue ? displayValue : '';
  }
}
