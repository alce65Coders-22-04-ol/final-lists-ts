# Componente Login. Responsabilidades

## Renderización

-   Un botón cuya etiqueta depende del estado (login/logout) leido desde el contexto

## Respuestas a eventos

-   Cuando el usuario hace click se ejecuta el método de **firebase** adecuado para hacer login / logout
-   Al finalizar con éxito cualquiera de los procesos, se utiliza el método para actualizar el estado proporcionado por el contexto
