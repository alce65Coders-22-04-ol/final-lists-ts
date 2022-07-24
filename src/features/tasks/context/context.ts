import { createContext } from 'react';
import { Context } from '../interfaces/context';

export const initialContext: Context = {
    tasks: [],
    setTasks: () => [],
    isLoading: false,
    setIsLoading: () => false,
    taskToEdit: null,
    setTaskToEdit: () => null,
};

export const TaskContext = createContext(initialContext);
