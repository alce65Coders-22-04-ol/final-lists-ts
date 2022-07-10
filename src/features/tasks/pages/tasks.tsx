import { TaskContextProvider } from '../context/provider';
import tasks from './tasks.module.css';

function TasksPage() {
    return (
        <TaskContextProvider>
            <section className={tasks.host}>
                <h2>Página Tasks</h2>
                <p>Lista de tareas</p>
            </section>
        </TaskContextProvider>
    );
}

export default TasksPage;
