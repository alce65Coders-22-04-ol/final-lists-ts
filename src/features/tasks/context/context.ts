import { createContext } from 'react';
import { Context } from '../interfaces/context';

export const initialContext: Context = {
    tasks: [],
    setTasks: (state) => {},
    isLoading: false,
    setIsLoading: (state) => {},
    taskToEdit: null,
    setTaskToEdit: (state) => {},
};

export const TaskContext = createContext(initialContext);
