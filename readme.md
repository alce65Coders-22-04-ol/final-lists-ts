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
