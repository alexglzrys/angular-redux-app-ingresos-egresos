import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

import { Subscription } from 'rxjs';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { filter } from 'rxjs/operators';
import { User } from '../models/User';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  userSubs!: Subscription;
  ingresoEgresoSubs!: Subscription;

  constructor(private store: Store<AppState>,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    // Suscripción al path user en busca de cambios - necesito conocer el uid para recuperar sus items de ingresos y egresos
    this.userSubs =  this.store.select('auth').pipe(
      // Esta suscripción recibe 2 respuestas al inicio, la primera como null (pues aun no hay respuesta desde firebase) y la segunda ya con la datas del usuario autenticado
      // Me suscribo si y solo si hay info del usuario.
      filter(({user}) => user != null)
    ).subscribe(({user}) => {
      // Invocar el servicio encargado de recuperar y escuchar cambios en los ingresos y egresos de este usuario
      this.ingresoEgresoSubs = this.ingresoEgresoService.ingresosEgresosListener(user!.uid!)
        .subscribe(ingresosEgresos => {
          console.log(ingresosEgresos);
          // Redux: Despachar acción para almacenar el listado de ingresos y egresos en el store
          this.store.dispatch( ingresoEgresoActions.setItems({items: ingresosEgresos}) );
        })
    });
  }

  ngOnDestroy(): void {
      this.userSubs.unsubscribe();
      this.ingresoEgresoSubs.unsubscribe();
  }

}
