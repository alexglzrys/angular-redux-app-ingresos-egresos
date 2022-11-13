import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/IngresoEgreso';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import { Subscription } from 'rxjs';
import * as uiActions from 'src/app/shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  ingresoEgresoForm!: FormGroup;
  type: string = 'ingreso';
  cargando: boolean = false;
  uiSuscription!: Subscription;

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });

    // Suscripción al estado de la UI
    this.uiSuscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    // Cancelar la suscripcion al estado de la UI para este componente
    this.uiSuscription.unsubscribe();
  }

  register() {
    if (this.ingresoEgresoForm.valid) {
      // Despachar acción - procesando información en vista
      this.store.dispatch( uiActions.isLoading() );

      // Recuperar la data del formulario reactivo
      const { description, amount } = this.ingresoEgresoForm.value;
      // Generar un objeto de tipo IngresoEgreso
      const data = new IngresoEgreso(description, amount, this.type);
      // Invocar al servicio encargado del registro
      this.ingresoEgresoService.registrarIngresoEgreso(data).then(ref => {
        // Despachar acción - proceso de información terminado en la vista
        this.store.dispatch( uiActions.stopLoading() );

        this.ingresoEgresoForm.reset();
        Swal.fire('Proceso completado', description, 'success');
      }).catch(err => {
        // Despachar acción - proceso de información terminado en la vista
        this.store.dispatch( uiActions.stopLoading() );

        Swal.fire('Lo sentimos', `Imposible registrar ${description}`, 'error')
      });
    }
  }

}
