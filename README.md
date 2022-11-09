# AngularIngresoEgresoApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.7.

## Crear proyecto en Firebase

- Ir al sitio Web de Firebase
- Logearse en caso de ser necesario
- Ir a la consola
- Crear un nuevo proyecto **(podemos evitar Google Analatytics para proyectos de entrenamiento)**
- Seleccionar el tipo de proyecto **Andriod, iOS, Web**
- Establecer un nombre alias para el proyecto **(podemos evitar configurar Firebase Hosting)**

## Autenticación

Podemos configurar nuestro proyecto para autenticarse a través de diferentes métodos que provee Firebase

- Email y contraseña: Seleccionar y Activar

## Firestore (Base de datos en tiempo real)

Podemos crear una base de datos en tiempo real para nuestro proyecto, es importante que al momento de configurarla, especifiquemos que será de producción y no de pruebas

- Si bien la configuración anterior obliga a nuestros usuarios a estar autenticados para poder escribir en la base de datos, podemos configurar las **reglas** para indicar temporalmente que todo mundo puede leer y escribir

```
// allow read, write: if false;
allow read, write;
```
