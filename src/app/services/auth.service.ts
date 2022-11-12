import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

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
}
