import { List } from '../components/list/list';
import { TaskContextProvider } from '../context/provider';
import tasks from './tasks.page.module.css';

function TasksPage({ title }: { title: string }) {
    return (
        <TaskContextProvider>
            <section className={tasks.host}>
                <h2>{title}</h2>
                <List></List>
            </section>
        </TaskContextProvider>
    );
}

export default TasksPage;
