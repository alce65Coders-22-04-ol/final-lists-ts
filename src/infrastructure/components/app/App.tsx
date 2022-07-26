import { startFirebase } from '../../services/firebase';
import { appOptionsType } from '../../interfaces/app.options';
import { Layout } from '../layout/layout/layout';
import { AppContextProvider } from '../../context/provider';
import { AppRoutes } from '../routes/app.routes';

function App() {
    startFirebase();
    const appTitle = 'Learning React';
    const company = 'ISDI Coders';

    const appOptions: appOptionsType = [
        { path: '/', label: 'Home', title: 'Página Home', isProtected: false },
        {
            path: '/tasks',
            label: 'Tasks',
            title: 'Página Tasks',
            isProtected: true,
        },
        {
            path: '/recipes',
            label: 'Recipes',
            title: 'Página Recipes',
            isProtected: true,
        },
        {
            path: '/notes',
            label: 'Notes',
            title: 'Página Notes',
            isProtected: true,
        },
        {
            path: '/about',
            label: 'About',
            title: 'Página About',
            isProtected: false,
        },
    ];
    return (
        <AppContextProvider>
            <Layout
                appTitle={appTitle}
                company={company}
                appOptions={appOptions}
            >
                <AppRoutes appOptions={appOptions}></AppRoutes>
            </Layout>
        </AppContextProvider>
    );
}

export default App;
