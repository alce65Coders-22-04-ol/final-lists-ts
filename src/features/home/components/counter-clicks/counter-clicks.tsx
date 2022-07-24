// Hooks de React

import { useState } from 'react';

// useState()

export function CounterClicks({ setTT }: { setTT(): void }) {
    const [state, setState] = useState({
        counter: 0,
        clicks: 0,
    });

    const handleClick = (increment: number) => {
        /**
         * El hook useState() en su forma de uso más básica
         * setState({
         *        counter: state.counter + increment,
         *       clicks: state.clicks + 1,
         * });
         *
         * Como alternativa, el parámetro del hook puede ser un callback
         * que recibirá como parámetro el último valor del estado (prev)
         */

        setState((prev) => ({
            counter: prev.counter + increment,
            clicks: prev.clicks + 1,
        }));

        /**
         * El método seTT, recibido como prop desde el padre setea en este
         * el contador total de clicks de todos los contadores
         */

        setTT();
    };
    return (
        <article>
            <h3>Contador {state.counter}</h3>
            <p>setStateClicks: {state.clicks}</p>
            <div>
                <button type="button" onClick={() => handleClick(+1)}>
                    ➕
                </button>
                <button type="button" onClick={() => handleClick(-1)}>
                    ➖
                </button>
            </div>
        </article>
    );
}
