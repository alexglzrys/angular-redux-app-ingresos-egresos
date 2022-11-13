import { Injectable } from '@angular/core';
// Firebase
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';

import { IngresoEgreso } from '../models/IngresoEgreso';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private firestore: AngularFirestore,
              private authService: AuthService) { }

  registrarIngresoEgreso(ingresoEgreso: IngresoEgreso): Promise<DocumentReference<firebase.firestore.DocumentData>> {
    // Crear un documento llamado ingreso-egreso
    // Insertarle una colección llamada items
    // Registrar un documento con la información del ingreso o egreso

    // Recuperar el uid del usuario
    const uid = this.authService.user?.uid;
    // Guardar el nuevo documento
    return this.firestore.doc(`${ uid }/ingreso-egreso`)
      .collection('items')
      .add({...ingresoEgreso})
  }
}
