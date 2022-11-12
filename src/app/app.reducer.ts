/**
 * Reducer principal de la aplicación
 */

import { ActionReducerMap } from '@ngrx/store';
import * as ui from './shared/ui.reducer';
import * as auth from './auth/auth.reducer';

// Listar todas las interfaces de estado que usará mi aplicación
export interface AppState {
  ui: ui.State,
  auth: auth.State
}

// Listar todos los reducer que usará la aplicación
export const appReducers: ActionReducerMap<AppState> = {
  ui: ui.uiReducer,
  auth: auth.authReducer
}
