import { useState } from 'react';
import { AppContext } from './context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const [isLogged, setIsLogged] = useState(false);

    const context = {
        isLogged,
        setIsLogged,
    };

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
