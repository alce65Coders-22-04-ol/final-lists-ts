# Componente CounterClicks. Responsabilidades

## Renderización

-   El título, 'Contador ' con el número de clicks
-   Un parrafo con 'setStateClicks: ' y el total de clicks
-   Los botones que incrementan y decrementan el contador

## Respuestas a eventos

-   En respuesta a eventos click de los botones:
    -   actualiza el valor del contador y el total de clicks cuando cambia el estado
    -   ejecuta además una función que recibe desde HomePage, con la cual se mantiene actualizado un contador del total de clicks de todos los contadores

# Objetivos

Este segundo componente contador utiliza un estado de tipo objeto, con una propiedad para el valor y otra para el número de clicks realizados
Cada vez que lo setea, ejecuta además una función que recibe desde HomePage, con la cual se mantiene actualizado un contador del total de clicks de todos los contadores
