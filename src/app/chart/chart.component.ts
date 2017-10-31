import { Component, OnInit } from '@angular/core';
import { ChartService } from './chart.service';
// import { Chart } from 'angular-highcharts';
// import * as Highcharts from 'highcharts';

// Highcharts.setOptions({
//   global: {
//     useUTC: false
//   },
// });

@Component({
  selector: 'app-chart',
  template: `<chart type="StockChart" [options]="options"></chart>`,
  // template: '<div [chart]="chart"></div>',
  styleUrls: ['./chart.component.css'],
  providers: [ChartService]
})
export class ChartComponent implements OnInit {
  private data = [];
  // public chart;
  public options;
  constructor(private chartService: ChartService) {
  }

  ngOnInit() {
    // Initial function calls
    this.getData();
  }

  // get chart data from chart serice
  getData() {
    return this.chartService.getChartData().subscribe((data) => {
      this.data = this.formatData(data);
      this.options = {
        title: { text: 'simple chart' },
        chart: {
          events: {
            load: function (event) {
              console.log('Chart loaded...');
            }
          }
        }, tooltip: {
          formatter: function () {
            return 'Price :' + this.y + '<br/>' + 'Time :' + this.x;
          }
        },
        rangeSelector: {
          selected: 0
        },
        series: [{
          color: 'rgb(0, 255, 127)',
          name: 'Price',
          data: this.data,
          tooltip: {
            valueDecimals: 2
          }
        }],
      };
      // this.chart = new Chart({
      //   chart: {
      //     type: 'line',
      //     zoomType: 'x',
      //   }, xAxis: {
      //     type: 'datetime'
      //   }, yAxis: {
      //     title: {
      //       text: ''
      //     },
      //     opposite: true
      //   }, legend: {
      //     enabled: false
      //   },
      //   title: {
      //     text: 'Stock price'
      //   },
      //   credits: {
      //     enabled: false
      //   },
      //   series: [{
      //     data: this.data,
      //   }]
      // });
    });
  }

  // format data to friendly format
  formatData(data: any): any[] {
    const friendlyData = [];
    for (let i = 0; i < data.t.length; i++) {
      if (new Date(data.t[i] * 1000).getFullYear() >= 2016) {
        friendlyData.push({
          'x': new Date(data.t[i] * 1000),
          'y': data.c[i]
        });
      }
    }
    return friendlyData;
  }

}
