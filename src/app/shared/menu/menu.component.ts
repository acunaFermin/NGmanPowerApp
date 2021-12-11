import { Component, OnInit } from '@angular/core';
import { GraficaService } from '../../grafica/services/grafica.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styles: [],
})
export class MenuComponent implements OnInit {
  constructor(private graficaService: GraficaService) {}

  ngOnInit(): void {}

  // let HH = 10000;
  // let n = 20;     /*cantidad de intervalos */
  // let Ym = 100;
  // let Yc = 50;
  // let S0 = 0.4;   /*0.4* achata la curva: 0 es una recta, 0,4 es una campana puntiaguda*/
  // let S1 = 0.01;  /*0.01* aumenta las HH al comienzo, 0.01 normal, mas de 0.01 y se  levanta la pata izquierda de la campana  */
  // let c = 10;     /*10 izq, 15 centro, 20 derecha*/

  left:string= 'left';
  center:string= 'center';
  right:string= 'right';
  straight:string = 'straight';

  radioBtnWavesSelector(radioSelected: string){
    if(radioSelected === 'left'){
      this.gaussShape= 0.4;
      this.gaussPosition= 10;
    }

    if(radioSelected === 'center'){
      this.gaussShape= 0.4;
      this.gaussPosition= 15;
    }

    if(radioSelected === 'right'){
      this.gaussShape= 0.4;
      this.gaussPosition= 20;
    }

    if(radioSelected === 'straight'){
      this.gaussShape= 0;
      this.gaussPosition= 15;
    }
    
    this.generateNewGraph();

  }

  manPowerHours: number = 10000;
  timeIntervals: number = 100;
  Ym: number = 100;
  Yc: number = 50;
  gaussShape: number = 0.4;
  S1: number = 0.01;
  gaussPosition: number = 10;

  generateNewGraph() {
    this.graficaService.GenerateCurve(
      this.manPowerHours,
      this.timeIntervals,
      this.Ym,
      this.Yc,
      this.gaussShape,
      this.S1,
      this.gaussPosition
    );

    this.graficaService.drawNewCurve$.emit();
  }

  dataGauss = this.graficaService.data4ExcelGauss;
  dataAcum = this.graficaService.data4ExcelAcum;

  dl(){
    this.graficaService.downLoadData();
    let Data = [this.dataGauss, this.dataAcum];
    let fileNames = ['gaussGraph','acumGraph']

    Data.forEach((data,index) => {
      this.downLoad(data,fileNames,index)
    });
  }

  downLoad(data:any, fileNames:string[],index:number){

    const worksheet = XLSX.utils.json_to_sheet(data)

    const workbook = {
      Sheets: {
        'data': worksheet
      },
      SheetNames: ['data']
    }

    const excelBuffer = XLSX.write(workbook, {bookType:'xlsx', type:'array'})

    this.saveAsExcel(excelBuffer, fileNames[index])

  };

  saveAsExcel(buffer: any, fileName: string){

    const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const EXCEL_EXTENSION = '.xlsx';

    const data = new Blob([buffer], {type: EXCEL_TYPE})
    saveAs(data, fileName+EXCEL_EXTENSION)

  }

  
}
