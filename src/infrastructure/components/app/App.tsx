import { startFirebase } from '../../services/firebase';

import { menuOptionsType } from '../../../layout/interfaces/menu-options';
import HomePage from '../../../features/home/pages/home';
import TasksPage from '../../../features/tasks/pages/tasks';
import { Layout } from '../../../layout/components/layout/layout';
import { AppContextProvider } from '../../context/provider';

function App() {
    startFirebase();
    const appTitle = 'Learning React';
    const company = 'ISDI Coders';
    const menuOptions: menuOptionsType = [
        { path: './index.html', label: 'Home' },
        { path: './tasks.html', label: 'Tasks' },
        { path: './about.html', label: 'About' },
    ];

    return (
        <AppContextProvider>
            <Layout
                appTitle={appTitle}
                company={company}
                menuOptions={menuOptions}
            >
                <>
                    <HomePage></HomePage>
                    <TasksPage></TasksPage>
                </>
            </Layout>
        </AppContextProvider>
    );
}

export default App;
