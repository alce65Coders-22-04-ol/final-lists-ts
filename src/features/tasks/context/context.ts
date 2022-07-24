import { createContext } from 'react';
import { iContext } from '../interfaces/context';

export const initialContext: iContext = {
    tasks: [],
    setTasks: () => [],
    isLoading: false,
    setIsLoading: () => false,
    taskToEdit: null,
    setTaskToEdit: () => null,
};

export const TaskContext = createContext(initialContext);
