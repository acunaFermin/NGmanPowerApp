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

  ngOnInit(): void {
    this.graficaService.ejeX$.subscribe((ejeX) => {
      this.xAxis = ejeX;
    });

    this.graficaService.ejeYacum$.subscribe((ejeY) => {
      this.yAxisAcum = ejeY;
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
