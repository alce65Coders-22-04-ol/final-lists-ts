import { createContext } from 'react';
import { Context } from '../interfaces/context';

export const initialContext: Context = {
    isLogged: false,
    setIsLogged: (state) => {},
    userLogged: { uid: '', name: '', email: '' },
    setUserLogged: (state) => {},
};

export const AppContext = createContext(initialContext);
