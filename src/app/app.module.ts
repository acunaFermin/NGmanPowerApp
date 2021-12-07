import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './shared/menu/menu.component';
import { GraficaModule } from './grafica/grafica.module';

@NgModule({
  declarations: [AppComponent, MenuComponent],
  imports: [BrowserModule, AppRoutingModule, GraficaModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
