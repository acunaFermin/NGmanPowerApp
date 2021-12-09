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

  xAxis: string[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
  ];

  yAxisAcum: number[] = [65, 59, 180, 81, 56, 55, 40];

  manPowerHours: number = 0;
  timeIntervals: number = 0;

  ngOnInit(): void {
    this.graficaService.drawNewCurve$.subscribe(() => {
      this.drawNewCurve();
    });
  }

  drawNewCurve() {
    let { xAxis, yAxisAcum, manPowerHours, timeIntervals } =
      this.graficaService.data4Drawing;

    this.xAxis = xAxis;
    this.yAxisAcum = yAxisAcum;
    this.manPowerHours = manPowerHours;
    this.timeIntervals = timeIntervals;
  }

  public lineChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 0,
    },
    scales: {
      yAxes: [
        {
          display: true,
          ticks: {
            suggestedMin: 0, // minimum will be 0, unless there is a lower value.
            // OR //
            beginAtZero: true, // minimum value will be 0.
          },
        },
      ],
    },
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
