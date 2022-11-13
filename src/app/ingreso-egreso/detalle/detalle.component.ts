import { Component, OnInit, OnDestroy } from '@angular/core';
//Redux
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import { isLoading, stopLoading } from '../../shared/ui.actions';

import { Subscription } from 'rxjs';
import { IngresoEgreso } from '../../models/IngresoEgreso';
import { IngresoEgresoService } from '../../services/ingreso-egreso.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: [
  ]
})
export class DetalleComponent implements OnInit, OnDestroy {

  ingresoEgresoSubs!: Subscription;
  uiSubs!: Subscription;
  ingresosEgresos: IngresoEgreso[] = [];

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    // Suscripción a cambios en tiempo real en los ingresos y egresos
    // Guardar el listado en una variable para iterarlos en la vista
    this.ingresoEgresoSubs = this.store.select('ingresosEgresos').subscribe(({ items })=> this.ingresosEgresos = items)
  }

  ngOnDestroy(): void {
      this.ingresoEgresoSubs.unsubscribe();
  }

  eliminar(uid: string, description: string) {
    this.ingresoEgresoService.borrarIngresoEgreso(uid)
      .then(_ => {
        Swal.fire('Proceso completado', `Se ha borrado ${description}`, 'success')
      })
      .catch(err => {
        Swal.fire('Lo sentimos', `No fue posible eliminar ${description}`, 'error')
      });
  }

}
