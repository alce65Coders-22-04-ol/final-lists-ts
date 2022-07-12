import { useEffect } from 'react';
import { useTasks } from '../../hooks/use.tasks';
import { AddOrEdit } from '../add/add';
import { Task } from '../task/task';
import list from './list.module.css';

export function List() {
    const { getContext, loadTasks } = useTasks();
    const { tasks, isLoading } = getContext();

    useEffect(() => {
        loadTasks();
        return () => {};
    }, [loadTasks]);

    return (
        <>
            <AddOrEdit></AddOrEdit>
            {isLoading && <p>Loading</p>}
            <p>Lista de tareas</p>
            <ul className={list.list}>
                {tasks.map((item) => (
                    <li key={item.id}>
                        <Task task={item}></Task>
                    </li>
                ))}
            </ul>
        </>
    );
}
