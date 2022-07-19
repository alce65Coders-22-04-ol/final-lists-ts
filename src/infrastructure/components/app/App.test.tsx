import { act, render, screen } from '@testing-library/react';
import { startFirebase } from '../../services/firebase';
import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

jest.mock('../../services/firebase');

describe('Given App component', () => {
    describe('When it has been instantiate', () => {
        const appTitle = /Learning React/i;
        const homePageTitle = /Página Home/i;
        const jsx = (
            <Router>
                <App />;
            </Router>
        );
        test('Then it renders app title & "Home Page" title', async () => {
            startFirebase as jest.Mock;
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                /* finish loading suspended data */
                render(jsx);
            });

            let element = screen.getByText(appTitle);
            expect(element).toBeInTheDocument();
            element = await screen.findByText(homePageTitle);
            expect(element).toBeInTheDocument();
        });
    });
    // describe('When it has been instantiate inside a router', () => {
    //     //     { path: '', label: 'Home' },
    //     //     { path: 'tasks', label: 'Tasks' },
    //     //     { path: 'about', label: 'About' },
    //     let entries: Array<string>;
    //     beforeEach(() => {
    //         entries = [...appOptions.map((item) => item.path), '/bad_route'];
    //     });

    //     test('If route is Home, then Home Page will be render', () => {
    //         render(
    //             <Router initialEntries={entries} initialIndex={0}>
    //                 <App></App>
    //             </Router>
    //         );
    //         const element = screen.getByText(/Página Home/i);
    //         expect(element).toBeInTheDocument();
    //     });
    //     test('If route is Tasks, then Task Page will be render', async () => {
    //         render(
    //             <Router initialEntries={entries} initialIndex={1}>
    //                 <App></App>
    //             </Router>
    //         );
    //         const element = await screen.findByText(/Página Tasks/i);
    //         expect(element).toBeInTheDocument();
    //     });
    //     test('If route is bad, then Home Page will be render', () => {
    //         render(
    //             <Router
    //                 initialEntries={entries}
    //                 initialIndex={entries.length - 1}
    //             >
    //                 <App></App>
    //             </Router>
    //         );
    //         const element = screen.getByText(/Página Home/i);
    //         expect(element).toBeInTheDocument();
    //     });
    // });
});
