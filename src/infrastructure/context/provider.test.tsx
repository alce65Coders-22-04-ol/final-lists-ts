import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext, useEffect } from 'react';

import { AppContext, initialContext } from './context';
import { AppContextProvider } from './provider';

describe('Given the context AppContext', () => {
    let TestComponent: Function;
    describe('When a Test Component is wrapper with this context', () => {
        beforeEach(() => {
            initialContext.setIsLogged();
            initialContext.setUserLogged();
            initialContext.userLogged.name = 'Pepe';
            TestComponent = () => {
                const { userLogged, isLogged, setIsLogged, setUserLogged } =
                    useContext(AppContext);
                useEffect(() => {
                    setIsLogged(true);
                    setUserLogged(initialContext.userLogged);
                }, [setIsLogged, setUserLogged]);

                const handleClick = () => {
                    setIsLogged(false);
                    setUserLogged(null);
                };

                return (
                    <>
                        <p>{userLogged?.name}</p>
                        <p>{isLogged && 'Logged'}</p>
                        <button onClick={handleClick}>Logout</button>
                    </>
                );
            };
        });
        test('Context values should be used in the component', () => {
            render(
                <AppContextProvider>
                    <TestComponent></TestComponent>
                </AppContextProvider>
            );
            let element1 = screen.queryByText(
                initialContext.userLogged.name as string
            );
            let element2 = screen.queryByText('Logged');
            expect(element1).toBeInTheDocument();
            expect(element2).toBeInTheDocument();
            const button = screen.getByRole('button');
            userEvent.click(button);
            element1 = screen.queryByText(
                initialContext.userLogged.name as string
            );
            element2 = screen.queryByText('Logged');
            expect(element1).not.toBeInTheDocument();
            expect(element2).not.toBeInTheDocument();
        });
    });
});
