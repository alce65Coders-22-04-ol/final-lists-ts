import { useState } from 'react';
import { iTask } from '../models/task';

import { TaskContext } from './context';

export function TaskContextProvider({ children }: { children: JSX.Element }) {
    const [tasks, setTasks] = useState([] as Array<iTask>);
    const [isLoading, setIsLoading] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null as null | iTask);

    const context = {
        tasks,
        setTasks,
        isLoading,
        setIsLoading,
        taskToEdit,
        setTaskToEdit,
    };

    return (
        <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
    );
}
