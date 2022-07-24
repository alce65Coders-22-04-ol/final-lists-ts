import { useTasks } from '../../hooks/use.tasks';
import { iTask } from '../../models/task';
import taskItem from './task.module.css';

export function Task({ task }: { task: iTask }) {
    const { deleteTask, updateTask, startToEditTask } = useTasks();

    const handleClick = (action: string) => {
        if (action === 'edit') {
            startToEditTask(task);
        } else {
            deleteTask(task.id);
        }
    };
    const handleChange = () => {
        task.isCompleted = !task.isCompleted;
        updateTask(task.id, task);
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
            <span>|</span>
            <span>{task.responsible}</span>
            <span>
                <span
                    role="button"
                    className={taskItem.button}
                    title="edit"
                    onClick={() => handleClick('edit')}
                >
                    🖊️
                </span>
                <span
                    role="button"
                    className={taskItem.button}
                    title="delete"
                    onClick={() => handleClick('delete')}
                >
                    🗑️
                </span>
            </span>
        </div>
    );
}
