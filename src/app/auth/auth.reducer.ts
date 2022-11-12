import { createReducer, on } from "@ngrx/store";
import { User } from '../models/User';
import { setUser, unsetUser } from './auth.actions';

// El estado referente a la auteticación, puede tener o no asignado un usuario
export interface State {
  user: User | null
}

export const initialState: State = {
  user: null
}

export const authReducer = createReducer(
  initialState,
  // siempre es importante desestructurar objetos y arreglos, ya que estos son pasados por referencia y se pueden mutar por accidente.
  on( setUser, (state, { user }) => ({...state, user: {...user}})),
  on( unsetUser, state => ({...state, user: null}))
);
