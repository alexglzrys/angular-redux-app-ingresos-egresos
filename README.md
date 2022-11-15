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

## Firebase Hosting

Publicar una aplicación de Angular mediante el servicio de Firebase Hosting requiere de los siguientes pasos:

- Construir la versión de producción de nuestra aplicación
```
ng build -c production
```
- En caso de que la aplicación exceda el tamaño máximo permitido, es necesario modificar el archivo angular.json para especificar nuevos tamaños de empaquetación 
```
"production": {
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "2mb",
      "maximumError": "5mb"
    },

// En caso de que lance un error por problemas de optimización

"architect": {
  "build": {
    "options": {
      ...
      "optimization": {
          "scripts": true,
          "fonts": { "inline": true },
          "styles": { "minify": true, "inlineCritical": false }
        }
    }
```
- Mover los archivos generados a nivel raíz de la carpeta **dist**
- Ir a la consola de firebase, seleccionar el proyecto y activar la caracteristica de **Hosting**
- Seguir el orden de los comandos propuestos por Firebase Hosting
```
npm install -g firebase-tools

firebase login
firebase logout (este es necesario si estamos logeados con otra cuenta)

firebase init (prepara y genera los archivos de configuración necesarios para desplegar el proyecto a Firebase Hosting)
```
- Seleccionar Hosting (barra espaciadora y enter)
- Usar un proyecto existente
- Seleccionar el proyecto
- Especificar el directorio raiz de la aplcación a deployar (**dist**)
- Indicar que se trata de una SPA **Y**
- **No sobre-escribir el archivo dist/index.html**

- Subir aplicación
```
firebase deploy
```



