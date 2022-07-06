import { render, screen } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { menuOptions } from '../app/App';
import { AppRoutes } from './app.routes';

describe('Given AppRoutes component', () => {
    describe('When it has been instantiate inside a router', () => {
        //     { path: '', label: 'Home' },
        //     { path: 'tasks', label: 'Tasks' },
        //     { path: 'about', label: 'About' },
        let entries: Array<string>;
        beforeEach(() => {
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
            render(
                <Router initialEntries={entries} initialIndex={1}>
                    <AppRoutes menuOptions={menuOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Tasks/i);
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
