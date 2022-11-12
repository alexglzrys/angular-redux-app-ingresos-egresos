import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit {

  ingresoEgresoForm!: FormGroup;
  type: string = 'ingreso';

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.ingresoEgresoForm = this.fb.group({
      description: ['', [Validators.required, Validators.minLength(5)]],
      amount: ['', [Validators.required, Validators.min(0)]]
    });
  }

  register() {
    if (this.ingresoEgresoForm.valid) {
      console.log(this.ingresoEgresoForm.value);
    }
  }

}
