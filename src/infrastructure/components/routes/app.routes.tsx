import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { appOptionsType } from '../../interfaces/app.options';
import { appStore } from '../../../infrastructure/store/store';
import { NotesProvider } from '../../../features/notes/context/notes.provider';
import { ProtectedRoute } from '../protected.route/protected.route';

const Home = React.lazy(() => import('../../../features/home/pages/home.page'));
const Todo = React.lazy(
    () => import('../../../features/tasks/pages/tasks.page')
);
const Recipes = React.lazy(
    () => import('../../../features/recipes/pages/recipes.page')
);
const Notes = React.lazy(
    () => import('../../../features/notes/pages/notes.page')
);
const About = React.lazy(
    () => import('../../../features/about/pages/about.page')
);

export function AppRoutes({ appOptions }: { appOptions: appOptionsType }) {
    const pages = [
        ({ title }: { title: string }) => <Home title={title} />,
        ({ title }: { title: string }) => (
            <ProtectedRoute>
                <Todo title={title} />
            </ProtectedRoute>
        ),
        ({ title }: { title: string }) => (
            <Provider store={appStore}>
                <ProtectedRoute>
                    <Recipes title={title} />
                </ProtectedRoute>
            </Provider>
        ),
        ({ title }: { title: string }) => (
            <NotesProvider>
                <ProtectedRoute>
                    <Notes title={title} />
                </ProtectedRoute>
            </NotesProvider>
        ),
        ({ title }: { title: string }) => <About title={title} />,
    ];
    return (
        <Routes>
            {appOptions.map((option, i) => (
                <Route
                    key={option.label}
                    path={option.path}
                    element={
                        <React.Suspense>
                            {pages[i]({ title: option.title })}
                        </React.Suspense>
                    }
                ></Route>
            ))}
            <Route path="*" element={<Navigate replace to="" />}></Route>
        </Routes>
    );
}
