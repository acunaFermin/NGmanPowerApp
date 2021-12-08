import { EventEmitter, Injectable } from '@angular/core';
import { ChartDataSets } from 'chart.js';

@Injectable({
  providedIn: 'root',
})
export class GraficaService {
  constructor() {}

  // let HH = 10000;
  // let n = 20;     /*cantidad de intervalos */
  // let Ym = 100;
  // let Yc = 50;
  // let S0 = 0.4;   /*0.4* achata la curva: 0 es una recta, 0,4 es una campana puntiaguda*/
  // let S1 = 0.01;  /*0.01* aumenta las HH al comienzo, 0.01 normal, mas de 0.01 y se  levanta la pata izquierda de la campana  */
  // let c = 10;     /*10 izq, 15 centro, 20 derecha*/

  HH: number = 1000;
  a: number = 0;
  b: number = 1000;
  n: number = 20;
  Ym: number = 100;
  Yc: number = 50;
  S0: number = 0.4;
  S1: number = 0.01;
  c: number = 10;
  ejeX: string[] = [];
  ejeYgauss: number[] = [];
  ejeYacum: number[] = [];

  ejeX$ = new EventEmitter<string[]>();
  ejeYgauss$ = new EventEmitter<number[]>();
  ejeYacum$ = new EventEmitter<number[]>();

  GenerateCurve(
    HH: number,
    n: number,
    Ym: number,
    Yc: number,
    S0: number,
    S1: number,
    c: number
  ) {
    this.HH = HH;
    this.a = 0;
    this.b = HH;
    this.n = n;
    this.Ym = Ym;
    this.Yc = Yc;
    this.S0 = S0;
    this.S1 = S1;
    this.c = c;

    for (let i = 0; i < n; i++) {
      this.ejeX[i] = `${i}`;
    }

    this.biseccion();
    this.ejeYgauss = this.gauss;
    this.ejeYacum = this.gaussAcum;

    return {
      xAxis: this.ejeX,
      yAxisGauss: this.ejeYgauss,
      yAxisAcumm: this.ejeYacum,
    };
  }

  /************************/
  suma = 0;
  resultado = [0];
  x = [0];
  z = [0];
  gauss = [0];
  gaussAcum = [0];

  acum(j: any) {
    let k =
      this.Ym -
      (2 * (this.Ym - this.Yc)) /
        (Math.exp(this.S0 * (j - this.c)) + Math.exp(this.S1 * (j - this.c)));
    return k;
  }

  funcion(x: any) {
    let k = this.acum(x) - this.acum(x - 1);
    return k;
  }

  cargar() {
    let x = [];
    let i = 0;
    for (i; i < this.n; i++) {
      let A = this.funcion(i * (30 / this.n));
      x[i] = A;
    }
    i = 0;
    return x;
  }

  reparte(hh: any) {
    let res = 0;
    let suma = 0;
    let i = 0;
    let x = [];
    x = this.cargar();
    let max = Math.max(...x);
    x.forEach((element) => {
      element = (element / max) * hh;
      element = Math.ceil(element);
      x[i] = element;
      suma = suma + element;
      i++;
    });

    res = suma - this.HH;
    i = 0;
    this.suma = suma;
    this.x = x;
    return res;
  }

  validacion() {
    let I = 0;

    I = I + 1;
    let m = (this.a + this.b) / 2;
    let fm = this.reparte(m);

    if (fm == 0) {
      let i = 0;
      let acumulado = 0;

      this.x.forEach((element) => {
        acumulado = acumulado + element;
        this.z[i] = acumulado;
        i++;
      });
      this.gauss = this.x;
      this.gaussAcum = this.z;
    } else {
      /*validar que sean de signos opuestos*/
      let r = this.reparte(m) * this.reparte(this.a);
      if (r < 0) {
        this.b = m;
        this.biseccion();
      } else {
        this.a = m;
        this.biseccion();
      }
    }
  }
  biseccion() {
    if (this.reparte(this.a) * this.reparte(this.b) < 0) {
      this.validacion();
    } else {
      alert('Ha ingresado un dato erroneo');
    }
  }
}
