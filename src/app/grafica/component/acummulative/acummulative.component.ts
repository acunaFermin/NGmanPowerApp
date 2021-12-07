import { Component, OnInit, ViewChild } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GraficaService } from '../../services/grafica.service';

@Component({
  selector: 'app-acummulative',
  templateUrl: './acummulative.component.html',
  styles: [],
})
export class AcummulativeComponent implements OnInit {
  constructor(private graficaService: GraficaService) {}

  ngOnInit(): void {
    let { xAxis, yAxisGauss, yAxisAcumm } = this.graficaService.GenerateCurve(
      1000,
      100,
      100,
      50,
      0.4,
      0.01,
      10
    );

    this.lineChartData = [{ data: yAxisAcumm, label: 'Series A' }];

    this.lineChartLabels = xAxis;
  }

  public lineChartData: ChartDataSets[] = [
    { data: [65, 59, 180, 81, 56, 55, 40], label: 'Series A' },
  ];
  public lineChartLabels: Label[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];
  public lineChartOptions: ChartOptions = {
    responsive: true,
  };
  public lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,0,0,0.3)',
    },
  ];

  public lineChartLegend = true;
  public lineChartPlugins = [];
}
