import { createContext } from 'react';
import { Context } from '../interfaces/context';

export const initialContext: Context = {
    isLogged: false,
    setIsLogged: () => {},
    userLogged: { uid: '', name: '', email: '' },
    setUserLogged: () => {},
};

export const AppContext = createContext(initialContext);
