import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
// ng2-charts
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
// Redux
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/IngresoEgreso';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  montoTotalIngresos: number = 0;
  montoTotalEgresos: number = 0;
  ingresos: number = 0;
  egresos: number = 0;
  ingresoEgresoSubs!: Subscription;

  public doughnutChartLabels: string[] = [ 'Ingresos', 'Egresos' ];
  public doughnutChartType: ChartType = 'doughnut';
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.doughnutChartLabels,
    datasets: [{data: [0,0]}],
  };
  public doughnutChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
  };


  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Suscribirme al estado actual de los ingresos y egresos
    // La estadistica se vuelve a calcular si los ingresos o egresos cambian
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
  }

  generarEstadistica(listado: IngresoEgreso[]) {
    // resetear valores por conveniencia (dos ventanas simultaneas)
    this.montoTotalEgresos = 0
    this.montoTotalIngresos = 0
    this.ingresos = 0
    this.egresos = 0
    // Genererar mi estadistica
    listado.forEach(item => {
      if (item.type === 'ingreso') {
        ++this.ingresos;
        this.montoTotalIngresos += item.amount;
      } else {
        ++this.egresos;
        this.montoTotalEgresos += item.amount;
      }
    })
    // Establecer los montos totales en la gráfica
    this.doughnutChartData.datasets = [{
      data: [this.montoTotalIngresos, this.montoTotalEgresos]
    }]

    // Actualizar el gráfico sin que sea necesario un socket
    this.chart?.chart?.update();
  }

}
