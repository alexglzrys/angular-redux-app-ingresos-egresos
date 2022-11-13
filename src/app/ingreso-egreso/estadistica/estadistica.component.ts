import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/IngresoEgreso';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  montoTotalIngresos: number = 0;
  montoTotalEgresos: number = 0;
  ingresos: number = 0;
  egresos: number = 0;
  ingresoEgresoSubs!: Subscription;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Suscribirme al estado actual de los ingresos y egresos
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos').subscribe(({ items }) => this.generarEstadistica(items));
  }

  ngOnDestroy(): void {
    this.ingresoEgresoSubs.unsubscribe();
  }

  generarEstadistica(listado: IngresoEgreso[]) {
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
  }

}
