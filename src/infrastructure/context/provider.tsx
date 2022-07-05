import { useState } from 'react';
import { AppContext } from './context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const [isLogged, setIsLogged] = useState(false);
    const [userLogged, setUserLogged] = useState({
        uid: '',
        name: '',
        email: '',
    });

    const context = {
        isLogged,
        setIsLogged,
        userLogged,
        setUserLogged,
    };

    return (
        <AppContext.Provider value={context}>{children}</AppContext.Provider>
    );
}
