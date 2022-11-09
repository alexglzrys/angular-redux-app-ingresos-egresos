import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth) { }

  createUser(name: string, email: string, password: string): Promise<firebase.auth.UserCredential> {
    // Retornar la promesa del usuario creado mediante email y password
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
}
