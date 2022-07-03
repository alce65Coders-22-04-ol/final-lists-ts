import { useState } from 'react';
import { Context } from './context';

export function ContextProvider({ children }: { children: JSX.Element }) {
    const [isLogged, setIsLogged] = useState(false);

    const context = {
        isLogged,
        setIsLogged,
    };

    return <Context.Provider value={context}>{children}</Context.Provider>;
}
