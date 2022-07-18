import { act, render, screen } from '@testing-library/react';

import { MemoryRouter as Router } from 'react-router-dom';
import App from './App';

describe('Given App component', () => {
    describe('When it has been instantiate', () => {
        const appTitle = /Learning React/i;
        const homePageTitle = /Home/i;
        const jsx = (
            <Router>
                <App />;
            </Router>
        );
        test('Then it renders app title & "Home Page" title ', async () => {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
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
