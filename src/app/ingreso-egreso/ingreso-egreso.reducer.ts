import { createReducer, on } from "@ngrx/store"
import { unsetItems, setItems } from './ingreso-egreso.actions';
import { IngresoEgreso } from '../models/IngresoEgreso';
import { AppState } from '../app.reducer';

export interface State {
  items: IngresoEgreso[]
}

// Interfaz que extiende el estado global de la aplicación con el estado cargado bajo demanda
export interface AppStateWithIngresoEgreso extends AppState {
  ingresosEgresos: State
}

// El estado correspondiente a los ingresos y egresos, por el momento es una colección de items del tipo IngresoEgreso
export const initialState: State = {
  items: []
}

export const ingresoEgresoReducer = createReducer(
  initialState,
  on( unsetItems, state => ({...state, items: []}) ),
  on( setItems, (state, { items }) => ({...state, items: [...items]}))
);
