import { createContext } from 'react';
import { Context } from '../interfaces/context';

export const initialContext: Context = {
    isLogged: false,
    setIsLogged: (_state) => {
        // used for set part of the state
    },
    userLogged: { uid: '', name: '', email: '' },
    setUserLogged: (_state) => {
        // used for set part of the state
    },
};

export const AppContext = createContext(initialContext);
