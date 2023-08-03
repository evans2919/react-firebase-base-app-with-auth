# Aplicación Base Sencilla con React, Context API, React Router y Firebase

Esta es una aplicación base sencilla desarrollada utilizando React, Context API, React Router y Firebase para la autenticación de usuarios. Esta plantilla puede servir como punto de partida para crear aplicaciones web con funcionalidades de autenticación y manejo de rutas.

## Características

- Autenticación de usuarios con Firebase.
- Manejo de rutas utilizando React Router.
- Almacenamiento de datos utilizando Context API para compartir información globalmente en la aplicación.

## Instalación

Sigue estos pasos para configurar el proyecto en tu máquina local:

1. Clona este repositorio en tu máquina:

```bash
git clone https://github.com/tu-usuario/tu-repositorio.git
```

2. Navega al directorio del proyecto:

```bash
cd tu-repositorio
```

3. Instala las dependencias utilizando npm o yarn:

```bash
npm install
```

o

```bash
yarn install
```

4. Crea un proyecto en Firebase e obtén las credenciales de tu aplicación. Luego, configura la información de Firebase en el archivo `src/firebase/firebaseConfig.js`.

## Configuración de Firebase

Antes de continuar, asegúrate de crear un proyecto en Firebase y obtener las credenciales necesarias para habilitar la autenticación. Aquí hay un ejemplo de cómo se vería el archivo `firebaseConfig.js`:

```javascript
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_DOMINIO.firebaseapp.com",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

```

Recuerda remplazar `"TU_API_KEY"`, `"TU_DOMINIO"`, `"TU_PROJECT_ID"`, `"TU_STORAGE_BUCKET"`, `"TU_MESSAGING_SENDER_ID"`, y `"TU_APP_ID"` con las credenciales de tu proyecto.

En este caso estamos utilizando un archivo .env para guardar las variables de entorno ya que son datos sensibles, puedes ver el ejemplo en el archivo .env.example

## Ejecución

Una vez que hayas configurado Firebase, puedes ejecutar la aplicación utilizando el siguiente comando:

```bash
npm start
```

o

```bash
yarn start
```

Esto iniciará la aplicación en modo de desarrollo. Abre tu navegador y accede a `http://localhost:3000` para ver la aplicación en funcionamiento.

## Contribuciones

Si encuentras errores o deseas agregar nuevas características, ¡serán bienvenidas tus contribuciones! Siéntete libre de enviar un Pull Request.


Espero que esta plantilla te sea útil para empezar a construir tu aplicación. ¡Buena suerte con tu proyecto! Si tienes alguna pregunta, no dudes en preguntar.