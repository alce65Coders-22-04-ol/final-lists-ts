import { useState } from 'react';

import { TaskContext } from './context';

export function TaskContextProvider({ children }: { children: JSX.Element }) {
    const [tasks, setTasks] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

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
