import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IngresoEgresoService } from '../services/ingreso-egreso.service';
import { IngresoEgreso } from '../models/IngresoEgreso';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoEgresoForm!: FormGroup;
  type: string = 'ingreso';

  constructor(private fb: FormBuilder,
              private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  register() {
    if (this.ingresoEgresoForm.valid) {
      // Recuperar la data del formulario reactivo
      const { description, amount } = this.ingresoEgresoForm.value;
      // Generar un objeto de tipo IngresoEgreso
      const data = new IngresoEgreso(description, amount, this.type);
      // Invocar al servicio encargado del registro
      this.ingresoEgresoService.registrarIngresoEgreso(data).then(ref => {
        this.ingresoEgresoForm.reset();
        Swal.fire('Proceso completado', description, 'success');
      }).catch(err => Swal.fire('Lo sentimos', `Imposible registrar ${description}`, 'error'));
    }
  }

}
