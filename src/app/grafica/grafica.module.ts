import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GraficaRoutingModule } from './grafica-routing.module';
import { CurveGeneratorComponent } from './component/curve-generator/curve-generator.component';
import { GaussComponent } from './component/gauss/gauss.component';
import { AcummulativeComponent } from './component/acummulative/acummulative.component';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    CurveGeneratorComponent,
    GaussComponent,
    AcummulativeComponent,
  ],
  imports: [CommonModule, GraficaRoutingModule, ChartsModule],
  exports: [CurveGeneratorComponent, GaussComponent, AcummulativeComponent],
})
export class GraficaModule {}
