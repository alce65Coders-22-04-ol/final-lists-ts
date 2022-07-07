import { useState } from 'react';
import { iUser } from '../model/user';
import { AppContext } from './context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const initialUserLoggedState: iUser = {
        uid: '',
        name: '',
        email: '',
    };
    const [isLogged, setIsLogged] = useState(false);
    const [userLogged, setUserLogged] = useState(initialUserLoggedState);

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
