import { useState } from 'react';
import { TaskModel } from '../models/task.model';

import { TaskContext } from './context';

export function TaskContextProvider({ children }: { children: JSX.Element }) {
    const [tasks, setTasks] = useState([] as Array<TaskModel>);
    const [isLoading, setIsLoading] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null as null | TaskModel);

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
