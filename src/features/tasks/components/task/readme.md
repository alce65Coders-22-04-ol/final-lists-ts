# Componente Counter. Responsabilidades

## Renderización

Un tarea con los siguientes elementos, basados en los datos que se reciben desde el componente **List**

-   Estado (completa o no)
-   Titulo
-   Responsable
-   Botón de borrar

## Respuestas a eventos

Cuando el usuario cambie el valor del checkbox que define el estado de la tarea,
se ejecuta el correspondiente handle.
Cuando el usuario pulse el botón de borrar, se ejecuta el correspondiente handle.

Su implementación se realizará en un custom hook para tareas; posteriormente podrá cambiarse dependiendo del patrón de arquitectura
