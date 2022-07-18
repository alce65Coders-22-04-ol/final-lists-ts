import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { appOptionsType } from '../../interfaces/app.options';
import { startFirebase } from '../../services/firebase';
import { AppRoutes } from './app.routes';

describe('Given AppRoutes component', () => {
    describe('When it has been instantiate inside a router', () => {
        let appOptions: appOptionsType;
        let entries: Array<string>;
        beforeEach(() => {
            appOptions = [
                { path: '/', label: 'Home', title: 'Página Home' },
                { path: '/tasks', label: 'Tasks', title: 'Página Tasks' },
                { path: '/recipes', label: 'Recipes', title: 'Página Recipes' },
                { path: '/about', label: 'About', title: 'Página About' },
            ];
            entries = [...appOptions.map((item) => item.path), '/bad_route'];
        });

        test('If route is Home, then Home Page will be render', async () => {
            const jsx = (
                <Router initialEntries={entries} initialIndex={0}>
                    <AppRoutes appOptions={appOptions}></AppRoutes>
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
                    <AppRoutes appOptions={appOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Tasks/i);
            expect(element).toBeInTheDocument();
        });
        test('If route is Recipes, then Recipes Page will be render', async () => {
            render(
                <Router initialEntries={entries} initialIndex={2}>
                    <AppRoutes appOptions={appOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Recipes/i);
            expect(element).toBeInTheDocument();
        });
        test('If route is About, then About Page will be render', async () => {
            render(
                <Router initialEntries={entries} initialIndex={3}>
                    <AppRoutes appOptions={appOptions}></AppRoutes>
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
                    <AppRoutes appOptions={appOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Home/i);
            expect(element).toBeInTheDocument();
        });
    });
});
