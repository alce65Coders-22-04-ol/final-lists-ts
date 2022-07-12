import { useTasks } from '../../hooks/use.tasks';
import { iTask } from '../../models/task';
import taskItem from './task.module.css';

export function Task({ task }: { task: iTask }) {
    const { deleteTask, completeTask } = useTasks();

    const handleClick = () => deleteTask(task.id);
    const handleChange = () => {
        task.isCompleted = !task.isCompleted;
        completeTask(task.id, task);
    };

    return (
        <div className={taskItem.host}>
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
        </div>
    );
}
