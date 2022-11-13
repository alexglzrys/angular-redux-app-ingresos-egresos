import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from '../models/IngresoEgreso';


export const unsetItems = createAction('[IngresoEgreso] Unset Items');
// Se espera almacenar un listado de elementos del tipo IngresoEgreso
export const setItems = createAction('[IngresoEgreso] Set Items', props<{items: IngresoEgreso[]}>());
