# Componente task/Add. Responsabilidades

## Renderización

Un formulario que incluye

-   Input para el título de la tarea
-   Input para el responsable de la tarea
-   Botón submit para añadir / guardar los datos

## Respuestas a eventos

Cuando en el contexto cambia el valor de taskToEdit, el componente lo evalua:

-   Si vale null se mantiene en modo 'añadir'
-   Si corresponde a una tarea, carga sus datos y pasa a modo 'editar'

Cuando el usuario escribe en los inputs, se actualiza el estado local del formulario.

Cuando el usuario pulse en botón de añadir/guardar se ejecuta el correspondiente handle, que a su vez invoca las funciones de editar o añadir.

Para cada una de ellas, su implementación se realizará en un custom hook para tareas; posteriormente podrá cambiarse dependiendo del patrón de arquitectura
