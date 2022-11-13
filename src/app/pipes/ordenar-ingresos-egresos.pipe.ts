import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/IngresoEgreso';

@Pipe({
  name: 'ordenarIngresosEgresos'
})
export class OrdenarIngresosEgresosPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {

    // generar una copia, sort es mutable y esta data proviene del store
    const copyItems = [...items];
    // Ordenar el listado de ingresos y egresos
    return copyItems.sort((a, b) => {
      // Los ingresos van primero, y luego los egresos al final
      if (a.type == 'ingreso') {
        return -1;
      } else {
        return 1;
      }
    })
  }

}
