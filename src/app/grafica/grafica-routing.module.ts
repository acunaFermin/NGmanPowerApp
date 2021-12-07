import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GaussComponent } from './component/gauss/gauss.component';
import { AcummulativeComponent } from './component/acummulative/acummulative.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: 'gauss', component: GaussComponent },
      { path: 'acumm', component: AcummulativeComponent },
      { path: '**', redirectTo: 'gauss' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraficaRoutingModule {}
