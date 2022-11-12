export class User {

  constructor(
    public uid?: string,
    public name?: string,
    public email?: string) { }

  // Método estático para crear un objeto de tipo User a partir de una colección de Firestore
  static fromFirestore({ uid, name, email }: any) {
    return new User(uid, name, email);
  }

}
