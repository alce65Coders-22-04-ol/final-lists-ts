import { createContext } from 'react';
import { iContext } from '../interfaces/context';

export const initialContext: iContext = {
    tasks: [],
    setTask: () => {},
    isLoading: false,
    setIsLoading: () => {},
};

export const TaskContext = createContext(initialContext);
