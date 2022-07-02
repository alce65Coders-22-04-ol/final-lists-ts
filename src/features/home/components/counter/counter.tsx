// Hooks de React

import { useState } from 'react';

// useState()

export function Counter({ setTT }: { setTT(): void }) {
    const [counter, setCounter] = useState(0);

    const handleClick = (increment: number) => {
        setCounter((prev) => prev + increment);
        setTT();
    };
    return (
        <article>
            <h3>Contador {counter}</h3>
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
