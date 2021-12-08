import { Component, OnInit } from '@angular/core';
import { GraficaService } from '../../grafica/services/grafica.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  constructor(private graficaService: GraficaService) {}

  ngOnInit(): void {}

  generateNewGraph() {
    let { xAxis, yAxisGauss, yAxisAcumm } = this.graficaService.GenerateCurve(
      10000,
      1000,
      100,
      50,
      0.4,
      0.01,
      10
    );

    this.graficaService.ejeX$.emit(xAxis);
    this.graficaService.ejeYgauss$.emit(yAxisGauss);
    this.graficaService.ejeYacum$.emit(yAxisAcumm);
  }
}
