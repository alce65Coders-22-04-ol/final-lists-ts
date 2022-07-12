import { createContext } from 'react';
import { iContext } from '../interfaces/context';

export const initialContext: iContext = {
    tasks: [],
    setTasks: () => {},
    isLoading: false,
    setIsLoading: () => {},
    taskToEdit: null,
    setTaskToEdit: () => {},
};

export const TaskContext = createContext(initialContext);
