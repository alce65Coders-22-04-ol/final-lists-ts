import React from 'react';
import { Provider } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import { appOptionsType } from '../../interfaces/app.options';
import { appStore } from '../../../infrastructure/store/store';

const Home = React.lazy(() => import('../../../features/home/pages/home'));
const Todo = React.lazy(() => import('../../../features/tasks/pages/tasks'));
const Recipes = React.lazy(
    () => import('../../../features/recipes/pages/recipes')
);
const About = React.lazy(() => import('../../../features/about/pages/about'));

export function AppRoutes({ appOptions }: { appOptions: appOptionsType }) {
    const pages = [
        ({ title }: { title: string }) => <Home title={title} />,
        ({ title }: { title: string }) => <Todo title={title} />,
        ({ title }: { title: string }) => (
            <Provider store={appStore}>
                <Recipes title={title} />
            </Provider>
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
