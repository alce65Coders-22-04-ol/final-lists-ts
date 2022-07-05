# Custom hook useLogin. Responsabilidades

-   Toma del contexto el estado isLogged y los setters setIsLogged y setUserLogged

## Respuestas a eventos

-   Proporciona el método de respuesta al click de un botón (handleClick) que puede ejecutar los procesos de login y logout

    -   Cuando el usuario hace se ejecuta el método de **firebase** adecuado para hacer login / logout
    -   Al finalizar con éxito cualquiera de los procesos, se utiliza el método para actualizar el estado proporcionado por el contexto
