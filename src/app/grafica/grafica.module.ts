import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficaRoutingModule } from './grafica-routing.module';
import { GaussComponent } from './component/gauss/gauss.component';
import { AcummulativeComponent } from './component/acummulative/acummulative.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [GaussComponent, AcummulativeComponent],
  imports: [CommonModule, GraficaRoutingModule, ChartsModule],
  exports: [GaussComponent, AcummulativeComponent],
})
export class GraficaModule {}
