# Trying TODO TS

Preparación de las clases del BootCamp online.

Incorporación de **Firebase** en un proyecto de React para utilizar

-   Autenticación
-   Bases de datos

## Instalación

1.  Scaffolding del proyecto con **Create React App** y el template de **Typescript**

    ```shell
    create react app <project> --template typescript

    ```

    Incluye la instalación de

        - **Typescript**
        - **Jest** (sin que figure como dependencia directa) / **Testing Library**
        - **ESLint** (sin que figure como dependencia directa), con las extensiones "react-app" y "react-app/jest"

    ### Dependencias

    `typescript: 4.7.3`,
    `@types/node`
    `web-vitals`

    `react: 18.1.0`,
    `react-dom: 18.1.0`,
    `react-scripts`
    `@types/react`
    `@types/react-dom`

    `@types/jest`:
    `@testing-library/jest-dom`
    `@testing-library/react`
    `@testing-library/user-event`

    ### Configuración de TS

2.  Editor Config

3.  Plugin de Prettier para ESLint

    ```shell
    npm i -D eslint-config-prettier
    ```

    -   En la configuración de **ESLint** en el _package.json_ (`"eslintConfig"`) se añade la extensión de Prettier

    ```json
    "extends": ["...", "prettier"]
    ```

    -   En la configuración de **Prettier** en el _package.json_ (`"prettier"`) se configura el uso de comillas simples

    ```json
    "singleQuote": true
    ```

## Componentes iniciales

-   carpeta app
    -   componente app: <Layout> + <Páginas> (más adelante con el router)
-   carpeta /layout
    -   components: layout - header - footer - menu
    -   interfaces: menu-options
-   carpeta features/home
    -   pages: HomePage

### Uso de module.css

-   Añadir Globals.d.ts en la carpeta sources
    ```ts
    declare module '*.module.css';
    declare module '*.module.scss';
    ```

### Testing

Se configura para estos test iniciales
Parámetros en el script de npm:

```json
"test": "react-scripts test --watchAll --collect-coverage"
```

Se testa: app - layout - header - footer - menu
Ficheros a excluir:

-   src/index.tsx
-   src/reportWebVitals.js

```json
"coveragePathIgnorePatterns": ["index.tsx", "reportWebVitals.js"]
```

## Home Page

Components (counters): counter, counter-clicks, counter-states

### Testing

Test completos de la página y los componentes

## Firebase

[Consola](hhhttps://console.firebase.google.com/?pli=1)

usuario: alejandro.cerezo@skylab.com

### Crear un proyecto

Nombre del proyecto: <todo-react>
Organización: <isdi.es>
ID: <alce65-todo-react>
No habilitar Analytics

### Proyecto todo-react

Inicio: Agregar firestore a tu app

-   Android
-   iOS
-   **Web**
-   Unity
-   Flutter

Opciones disponibles

-   Authentication
-   Cloud Firestore
-   RealTime Database
-   Storage
-   Functions ...

### Registrar aplicación Web

Nombre: <Todo-App>
No configurar Firebase Hosting

Agrega el SDK de Firebase

```shell
npm i firebase
```

Datos para el fichero de inicialización app/firebase.ts

Los valores personales se trasladan a un fichero .env
Este fichero debe quedar excluido en el .gitignore
Para ser usadas en React, las variables deben denominarse REACT_APP...

    -   REACT_APP_APIKEY
    -   REACT_APP_AUTHDOMAIN
    -   REACT_APP_DB=
    -   REACT_APP_PID=
    -   REACT_APP_SB=
    -   REACT_APP_SID=
    -   REACT_APP_APPID=
    -   REACT_APP_MID=

### Autentication

Agrega método(s) de acceso y comenzar a utilizar Firebase Auth

-   Google
-   GitHub ...

## Google

Nombre público del proyecto: alce65-todo-react
Correo electrónico de asistencia del proyecto: alejandro.cerezo@skylabcoders.com

Comprobar "Dominios autorizados"

## Github

[Registra tu app](https://github.com/settings/applications/new) como aplicación de desarrollador en GitHub y obtén el ID de cliente y el Secreto de cliente de OAuth 2.0.

## Contexto

Se crea un contexto para la aplicación (AppContext) con su correspondiente Provider
Este último se utiliza como wrapper en App

En el contexto se incluye y se exporta un estado (isLogged) y su setter (setIsLogged)

## Componente login

Inicialmente se crea con Google como proveedor.
Se añade un botón con la capacidad de login / logout

El estado manipulado desde este componente corresponde al creado en el contexto.

Se incorpora el componente en el header (layout/header) para que sea renderizado.

## Test del componente login

Se crea un mock del módulo de firebase,
Se le suministra al componente un contexto con los datos adecuados para el test.
