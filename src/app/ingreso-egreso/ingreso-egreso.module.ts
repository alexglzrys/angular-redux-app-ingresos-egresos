import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
// Módulos de terceros
import { NgChartsModule } from 'ng2-charts';
// Módulos compartidos
import { SharedModule } from '../shared/shared.module';
// Componentes
import { DashboardComponent } from '../dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso.component';
import { DetalleComponent } from './detalle/detalle.component';
import { EstadisticaComponent } from './estadistica/estadistica.component';
// Pipes
import { OrdenarIngresosEgresosPipe } from '../pipes/ordenar-ingresos-egresos.pipe';
import { RouterModule } from '@angular/router';

// ng g m ingreso-egreso/ingreso-egreso --flat

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    DetalleComponent,
    EstadisticaComponent,
    OrdenarIngresosEgresosPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    NgChartsModule,
    SharedModule,
  ]
})
export class IngresoEgresoModule { }
