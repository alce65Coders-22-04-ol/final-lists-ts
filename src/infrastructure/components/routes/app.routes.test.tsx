import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { menuOptionsType } from '../../../layout/interfaces/menu-options';
import { startFirebase } from '../../services/firebase';
import { AppRoutes } from './app.routes';

describe('Given AppRoutes component', () => {
    describe('When it has been instantiate inside a router', () => {
        let menuOptions: menuOptionsType;
        let entries: Array<string>;
        beforeEach(() => {
            menuOptions = [
                { path: '/', label: 'Home' },
                { path: '/tasks', label: 'Tasks' },
                { path: '/recipes', label: 'Recipes' },
                { path: '/about', label: 'About' },
            ];
            entries = [...menuOptions.map((item) => item.path), '/bad_route'];
        });

        test('If route is Home, then Home Page will be render', async () => {
            const jsx = (
                <Router initialEntries={entries} initialIndex={0}>
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Router>
            );
            render(jsx);
            const element = await screen.findByText(/Página Home/i);
            expect(element).toBeInTheDocument();
        });
        test('If route is Tasks, then Task Page will be render', async () => {
            startFirebase();
            render(
                <Router initialEntries={entries} initialIndex={1}>
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Tasks/i);
            expect(element).toBeInTheDocument();
        });
        test('If route is Recipes, then Recipes Page will be render', async () => {
            render(
                <Router initialEntries={entries} initialIndex={2}>
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Recipes/i);
            expect(element).toBeInTheDocument();
        });
        test('If route is About, then About Page will be render', async () => {
            render(
                <Router initialEntries={entries} initialIndex={3}>
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Router>
            );
            let element;
            await waitFor(
                async () => {
                    element = await screen.findByText(/Página About/i);
                },
                { timeout: 2000 }
            );
            expect(element).toBeInTheDocument();
        });
        test('If route is bad, then Home Page will be render', async () => {
            render(
                <Router
                    initialEntries={entries}
                    initialIndex={entries.length - 1}
                >
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Home/i);
            expect(element).toBeInTheDocument();
        });
    });
});
