import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  // Método para conocer el estado actual del usuario (si esta conectado, desconectado, su información, etc)
  // Lo ideal es ejecutar este método en el componente raiz de la aplicación
  initAuthListener() {
    this.auth.authState.subscribe(fire_user  => {
      console.log(fire_user)
      console.log(fire_user?.email, fire_user?.uid);
    })
  }

  createUser(name: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    // Retornar la promesa del usuario creado mediante email y password
    return this.auth.createUserWithEmailAndPassword(email, password);
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
