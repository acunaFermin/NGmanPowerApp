import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'grafica',
    loadChildren: () =>
      import('./grafica/grafica.module').then((m) => m.GraficaModule),
  },
  { path: '**', redirectTo: 'grafica' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
