import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/IngresoEgreso';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgresoSubs!: Subscription;
  ingresosEgresos: IngresoEgreso[] = [];

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    // Suscripción a cambios en tiempo real en los ingresos y egresos
    // Guardar el listado en una variable para iterarlos en la vista
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos').subscribe(({ items })=> this.ingresosEgresos = items)
  }

  ngOnDestroy(): void {
      this.ingresoEgresoSubs.unsubscribe();
  }

  eliminar(uid: string) {
    console.log(uid);
  }

}
