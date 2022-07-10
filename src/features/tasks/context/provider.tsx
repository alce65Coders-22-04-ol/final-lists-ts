import { useState } from 'react';

import { TaskContext } from './context';

export function TaskContextProvider({ children }: { children: JSX.Element }) {
    const [tasks, setTask] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const context = {
        tasks,
        setTask,
        isLoading,
        setIsLoading,
    };

    return (
        <TaskContext.Provider value={context}>{children}</TaskContext.Provider>
    );
}
