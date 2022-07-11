import { useEffect } from 'react';
import { useTasks } from '../../hooks/use.tasks';
import { Add } from '../add/add';
import { Task } from '../task/task';

export function List() {
    const { getContext, loadTasks } = useTasks();
    const { tasks, isLoading } = getContext();

    useEffect(() => {
        loadTasks();
        return () => {};
    }, [loadTasks]);

    return (
        <>
            <p>List</p>
            <Add></Add>
            {isLoading && <p>Loading</p>}
            <ul>
                {tasks.map((item) => (
                    <li key={item.id}>
                        <Task task={item}></Task>
                    </li>
                ))}
            </ul>
        </>
    );
}
