import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { GraficaService } from '../../services/grafica.service';

@Component({
  selector: 'app-gauss',
  templateUrl: './gauss.component.html',
  styles: [],
})
export class GaussComponent implements OnInit {
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
  yAxisGauss: number[] = [65, 59, 180, 81, 56, 55, 40];

  ngOnInit(): void {
    this.graficaService.ejeX$.subscribe((ejeX) => {
      this.xAxis = ejeX;
    });

    this.graficaService.ejeYgauss$.subscribe((ejeY) => {
      this.yAxisGauss = ejeY;
    });
  }

  public lineChartOptions: ChartOptions = {
    responsive: true,
    animation: {
      duration: 0,
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
