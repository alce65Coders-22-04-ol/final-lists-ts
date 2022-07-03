# Componente App. Responsabilidades

## Renderización

-   El titulo de la página
-   El total de clicks, que toma de su propio estado
-   Los componentes correspondientes a los tres contadores:
    -   Counter
    -   CounterClicks
    -   CounterStates

## Respuestas a eventos

-   En respuesta a eventos click de los componentes que renderiza, actualiza el total de clicks de todos los contadores mediante una función que se pasa por props a los componentes mencionados

# Objetivos

El primer componente contador utiliza un estado para el valor con un simple valor numérico
El segundo componente contador utiliza un estado de tipo objeto, con una propiedad para el valor y otra para el número de clicks realizados
El tercer componente contador utiliza dos estado de tipo number, uno para el valor y otro para el número de clicks realizados

Cada vez que se setea cualquiera de los contadores, ejecuta además una función que recibe desde HomePage, con la cual se mantiene actualizado un contador del total de clicks de todos los contadores
