import { startFirebase } from '../../services/firebase';
import { menuOptionsType } from '../../../layout/interfaces/menu-options';
import { Layout } from '../../../layout/components/layout/layout';
import { AppContextProvider } from '../../context/provider';
import { AppRoutes } from '../routes/app.routes';

function App() {
    startFirebase();
    const appTitle = 'Learning React';
    const company = 'ISDI Coders';

    const menuOptions: menuOptionsType = [
        { path: '/', label: 'Home' },
        { path: '/tasks', label: 'Tasks' },
        { path: '/recipes', label: 'Recipes' },
        { path: '/about', label: 'About' },
    ];
    return (
        <AppContextProvider>
            <Layout
                appTitle={appTitle}
                company={company}
                menuOptions={menuOptions}
            >
                <AppRoutes menuOptions={menuOptions}></AppRoutes>
            </Layout>
        </AppContextProvider>
    );
}

export default App;
