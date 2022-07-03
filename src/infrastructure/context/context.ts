import { createContext } from 'react';

export interface iContext {
    isLogged: boolean;
    setIsLogged: Function;
}

const initialContext: iContext = {
    isLogged: false,
    setIsLogged: () => {},
};

export const Context = createContext(initialContext);
