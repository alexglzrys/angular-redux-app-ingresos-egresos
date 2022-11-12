import { createAction, props } from '@ngrx/store';
import { User } from '../models/User';

// Para establecer la información del usuario se requiere que este cumpla con las propiedades del model User (name, email, uid)
export const setUser = createAction('[Auth] Set User', props<{user: User}>());
export const unsetUser = createAction('[Auth] Unset User');
