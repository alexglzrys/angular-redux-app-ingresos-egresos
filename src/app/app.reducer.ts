/**
 * Reducer principal de la aplicación
 */

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';

// Listar todas las interfaces de estado que usará mi aplicación
export interface AppState {
  ui: ui.State
}

// Listar todos los reducer que usará la aplicación
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer
}
