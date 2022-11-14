import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Store } from '@ngrx/store';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/User';

// Redux
import { AppState } from '../app.reducer';
import * as authActions from 'src/app/auth/auth.actions';
import * as ingresoEgresoActions from '../ingreso-egreso/ingreso-egreso.actions';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription!: Subscription;
  private _user!: User | null;

  // Redux: Inyectar el store. Este servicio cuenta con métodos que cuyas acciones pueden modificar el estado global de la aplicación
  constructor(private auth: AngularFireAuth,
              private firestore: AngularFirestore,
              private store: Store<AppState>) { }

  // GETTER para recuperar la información del usuaro logeado a través de este servicio
  get user() {
    return this._user;
  }

  // Método para conocer el estado actual del usuario (si esta conectado, desconectado, su información, etc)
  // Lo ideal es ejecutar este método en el componente raiz de la aplicación
  initAuthListener() {
    this.auth.authState.subscribe(fire_user  => {
      // console.log(fire_user)
      // console.log(fire_user?.email, fire_user?.uid);

      // * Este es un punto perfecto para conocer si un usuario a iniciado o cerrado sesión
      if (fire_user) {
        // Consultar documento en Firestore para conocer el nombre del usuario
        this.userSubscription = this.firestore.doc(`${ fire_user.uid }/user`).valueChanges().subscribe(firestoreUser => {
          // Transformar la colección de firestore a un objeto de tipo User
          const user = User.fromFirestore(firestoreUser);
          // Guardar una referencia del usuario logeado en el ámbito global de este servicio
          this._user = user;
          // Redux: Guardar información general del usuario en el store
          this.store.dispatch( authActions.setUser({user}) );
        })
      } else {
        // Redux: El usuario cerro sesión en la aplicación
        this.store.dispatch( authActions.unsetUser() );
        // Redux: El usuario cerro sesión por tanto tengo que limpiar mi listado de items
        this.store.dispatch( ingresoEgresoActions.unsetItems() );
        // Cancelar la suscripción para evitar fugas de memoria (ya no me interesa dar seguimiento al usuario deslogeado)
        this.userSubscription?.unsubscribe();

        // Limpiar la referecia del usuario logeado en el servicio
        this._user = null;
      }
    })
  }

  createUser(name: string, email: string, password: string): Promise<void> {
    // Retornar la promesa del usuario creado mediante email y password
    return this.auth.createUserWithEmailAndPassword(email, password).then(({user}) => {
      // Crear un documento de firestore con los datos del usuario
      const newUser = new User(user?.uid, name, email);
      return this.firestore.doc(`${ user?.uid}/user`).set({...newUser});
    });
  }

  loginUser(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.auth.signOut();
  }

  // Método auxiliar para negar o permitir el acceso a los usuarios a rutas restringidas de la aplicación
  // Es importante que retorne un booleano, ya sea de forma plana, a manera de promesa u observable. Para implementarlo en el guard
  isAuth(): Observable<boolean> {
    return this.auth.authState.pipe(
      // retornar un booleano si el usuario esta o no logeado
      map(firebase_user => firebase_user != null)
    );
  }
}
