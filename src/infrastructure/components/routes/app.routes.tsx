import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { menuOptionsType } from '../../../layout/interfaces/menu-options';

const Home = React.lazy(() => import('../../../features/home/pages/home'));
const Todo = React.lazy(() => import('../../../features/tasks/pages/tasks'));
// const About = React.lazy(() => import('../../pages/about'));

export function AppRoutes({ menuOptions }: { menuOptions: menuOptionsType }) {
    return (
        <Routes>
            <Route
                path={menuOptions[0].path}
                element={
                    <React.Suspense>
                        <Home />
                    </React.Suspense>
                }
            ></Route>
            <Route
                path={menuOptions[1].path}
                element={
                    <React.Suspense>
                        <Todo />
                    </React.Suspense>
                }
            ></Route>
            <Route path="*" element={<Navigate replace to="" />}></Route>
        </Routes>
    );
}
