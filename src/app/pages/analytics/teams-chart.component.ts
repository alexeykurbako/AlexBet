import {Component, OnInit} from '@angular/core';
import {ChartOptions, ChartType, ChartDataSets} from 'chart.js';
import * as pluginDataLabels from 'chartjs-plugin-datalabels';
import {Label} from 'ng2-charts';
import {ChartsData} from '../../@core/interfaces/common/charts';
import {takeUntil} from 'rxjs/operators';
import {Subject} from 'rxjs';
import {NbToastrService} from '@nebular/theme';
import {BetsData} from '../../@core/interfaces/common/bets';

@Component({
  selector: 'ngx-teams-chart',
  template: `
      <div style="width: 900px; height: 100%; margin: 0 auto;">
          <canvas baseChart
                  [datasets]="barChartData"
                  [labels]="barChartLabels"
                  [options]="barChartOptions"
                  [plugins]="barChartPlugins"
                  [legend]="barChartLegend"
                  [chartType]="barChartType">
          </canvas>
      </div>
  `,
  styleUrls: ['./charts-common.component.scss'],
})
export class BarChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {xAxes: [{}], yAxes: [{}]},
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      },
    },
  };
  public barChartLabels: Label[] = [];
  public barChartType: ChartType = 'bar';
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [{data: [], label: 'team name'}];

  protected readonly unsubscribe$ = new Subject<void>();

  constructor(private chartService: ChartsData,
              private betsservice: BetsData,
              private toasterService: NbToastrService) {
  }

  ngOnInit() {
    this.chartService.getTeamsChartData().pipe(takeUntil(this.unsubscribe$)).subscribe(data => {
      this.toasterService.success('', `Data was uploaded`);

      this.barChartLabels = data.axisLabels;
      this.barChartData[0].data = data.data;
    });
  }
}
