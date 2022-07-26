import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter as Router } from 'react-router-dom';
import { appOptionsType } from '../../interfaces/app.options';
import { startFirebase } from '../../services/firebase';
import { initializeApp } from 'firebase/app';
import { getDatabase, get } from 'firebase/database';
import { getFirestore, getDocs } from 'firebase/firestore';
import { AppRoutes } from './app.routes';

jest.mock('firebase/app');
jest.mock('firebase/database');
jest.mock('firebase/firestore');

jest.mock('../../services/firebase');

describe('Given AppRoutes component', () => {
    describe('When it has been instantiate inside a router', () => {
        let appOptions: appOptionsType;
        let entries: Array<string>;
        beforeEach(() => {
            appOptions = [
                { path: '/', label: 'Home', title: 'Página Home' },
                { path: '/tasks', label: 'Tasks', title: 'Página Tasks' },
                { path: '/recipes', label: 'Recipes', title: 'Página Recipes' },
                { path: '/notes', label: 'Notes', title: 'Página Notes' },
                { path: '/about', label: 'About', title: 'Página About' },
            ];
            entries = [...appOptions.map((item) => item.path), '/bad_route'];

            initializeApp as jest.Mock;
            getDatabase as jest.Mock;
            getFirestore as jest.Mock;

            (get as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(true),
                val: jest.fn().mockReturnValue({}),
            });
            (getDocs as jest.Mock).mockReturnValue([
                {
                    data: jest.fn().mockReturnValue({}),
                },
            ]);
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
        test('If route is Notes, then Notes Page will be render', async () => {
            render(
                <Router initialEntries={entries} initialIndex={3}>
                    <AppRoutes appOptions={appOptions}></AppRoutes>
                </Router>
            );
            const element = await screen.findByText(/Página Notes/i);
            expect(element).toBeInTheDocument();
        });
        test('If route is About, then About Page will be render', async () => {
            render(
                <Router initialEntries={entries} initialIndex={4}>
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
