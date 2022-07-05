import { createContext } from 'react';
import { iContext } from '../interfaces/context';

const initialContext: iContext = {
    isLogged: false,
    setIsLogged: () => {},
    userLogged: { uid: '', name: '', email: '' },
    setUserLogged: () => {},
};

export const AppContext = createContext(initialContext);
