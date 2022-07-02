import { menuOptionsType } from '../layout/interfaces/menu-options';
import HomePage from '../features/home/pages/home';
import TasksPage from '../features/tasks/pages/tasks';
import { Layout } from '../layout/components/layout/layout';

function App() {
    const appTitle = 'Learning React';
    const company = 'ISDI Coders';
    const menuOptions: menuOptionsType = [
        { path: './index.html', label: 'Home' },
        { path: './tasks.html', label: 'Tasks' },
        { path: './about.html', label: 'About' },
    ];

    return (
        <Layout appTitle={appTitle} company={company} menuOptions={menuOptions}>
            <>
                <HomePage></HomePage>
                <TasksPage></TasksPage>
            </>
        </Layout>
    );
}

export default App;
