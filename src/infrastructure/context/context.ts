import { createContext } from 'react';
import { iContext } from '../interfaces/context';

export const initialContext: iContext = {
    isLogged: false,
    setIsLogged: () => {},
    userLogged: { uid: '', name: '', email: '' },
    setUserLogged: () => {},
};

export const AppContext = createContext(initialContext);
