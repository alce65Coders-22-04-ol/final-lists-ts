import { createContext } from 'react';
import { Context } from '../interfaces/context';

export const initialContext: Context = {
    tasks: [],
    setTasks: (_state) => {
        // used for set part of the state
    },
    isLoading: false,
    setIsLoading: (_state) => {
        // used for set part of the state
    },
    taskToEdit: null,
    setTaskToEdit: (_state) => {
        // used for set part of the state
    },
};

export const TaskContext = createContext(initialContext);
