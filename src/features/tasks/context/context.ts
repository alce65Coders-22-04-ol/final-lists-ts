import { createContext } from 'react';
import { iContext } from '../interfaces/context';

export const initialContext: iContext = {
    tasks: [],
    setTasks: () => {},
    isLoading: false,
    setIsLoading: () => {},
};

export const TaskContext = createContext(initialContext);
