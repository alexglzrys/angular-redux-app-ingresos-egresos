import { Injectable } from '@angular/core';
// Firebase
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { map } from 'rxjs/operators';

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

  // Recuperar mi colección de docuementos (items) referentes a los ingresos y egresos
  ingresosEgresosListener(uid: string) {
    // Solo obtenemos los valores guardados de los documentos (valueChanges)
    /*return this.firestore.collection(`${ uid }/ingreso-egreso/items`)
      .valueChanges()
      .subscribe(items => {
        console.log(items)
      });*/

    // Me interesa conocer toda la información de cada documento "metadata y data", en cualquier momento. (snapshot)
    return this.firestore.collection(`${ uid }/ingreso-egreso/items`)
      .snapshotChanges()
      .pipe(
        // Solo me interesa conocer el id del documento, y construir y devolver un nuevo objeto con la información que necesito
        // El snapshot me retorna toda la metadata del documento (incluido el id del mismo), y la función data() me retorna el valor actual del documento
        map(collections => collections.map(docRef => ({uid: docRef.payload.doc.id, ...docRef.payload.doc.data() as any})))
      )
      .subscribe(items => console.log(items));
  }
}
