// import { useContext } from 'react';
// import { TodoContext } from '../../../context/todo.context';
import { useTasks } from '../../hooks/use.tasks';
import { iTask } from '../../models/task';

export function Task({ task }: { task: iTask }) {
    const { deleteTask, completeTask } = useTasks();

    const handleClick = () => deleteTask(task.id);
    const handleChange = () => completeTask(task.id, task);

    return (
        <>
            <span>
                <input
                    type="checkbox"
                    checked={task.isCompleted}
                    onChange={handleChange}
                />
            </span>
            <span>{task.title}</span>
            <span> | </span>
            <span>{task.responsible}</span>
            <span role="button" className="button" onClick={handleClick}>
                🗑️
            </span>
        </>
    );
}
