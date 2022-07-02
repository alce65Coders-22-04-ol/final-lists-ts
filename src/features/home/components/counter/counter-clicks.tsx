// Hooks de React

import { useState } from 'react';

// useState()

export function CounterClicks({ setTT }: { setTT(): void }) {
    const [state, setState] = useState({
        counter: 0,
        clicks: 0,
    });

    const handleClick = (increment: number) => {
        setState((prev) => ({
            counter: prev.counter + increment,
            clicks: prev.clicks + 1,
        }));
        setTT();
        //   setState({
        //       counter: state.counter + increment,
        //       clicks: state.clicks + 1,
        //   });
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
