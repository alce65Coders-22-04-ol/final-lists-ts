import { useState } from 'react';
import { UserModel } from '../models/user.model';
import { AppContext } from './context';

export function AppContextProvider({ children }: { children: JSX.Element }) {
    const initialUserLoggedState: UserModel = {
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
