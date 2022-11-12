import { createReducer, on } from "@ngrx/store";
import { isLoading, stopLoading } from './ui.actions';

export interface State {
  isLoading: boolean;
}

// Estado inicial para el Loading de la aplicación
export const initialState: State = {
  isLoading: false
};

// Reducer de mi UI
export const uiReducer = createReducer(
  initialState,
  on(isLoading, state => ({...state, isLoading: true})),
  on(stopLoading, state => ({...state, isLoading: false}))
);
