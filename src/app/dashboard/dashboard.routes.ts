import { Routes } from '@angular/router';
import { EstadisticaComponent } from '../ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from '../ingreso-egreso/detalle/detalle.component';
import { IngresoEgresoComponent } from '../ingreso-egreso/ingreso-egreso.component';

// Solo declaramos el arreglo de rutas hijas correspondientes al Dashboard
// Se pudo haber declarado un modulo para ello, sin embargo, al ser una aplicación pequeña, basta con tener un solo módulo AppModule
export const dashboardRoutes: Routes = [
    {path: '', component: EstadisticaComponent},
    {path: 'detalle', component: DetalleComponent},
    {path: 'ingreso-egreso', component: IngresoEgresoComponent}
];
