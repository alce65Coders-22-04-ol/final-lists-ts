import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useContext, useEffect } from 'react';
import { UserModel } from '../models/user.model';

import { AppContext, initialContext } from './context';
import { AppContextProvider } from './provider';

describe('Given the context AppContext', () => {
    let TestComponent: Function;
    describe('When a Test Component is wrapper with this context', () => {
        let mockUser: UserModel;
        beforeEach(() => {
            /**
             * Se ejecutan las funciones del initialContext
             * para que las cubra el coverage
             */
            initialContext.setIsLogged(false);
            initialContext.setUserLogged({
                uid: '1',
                name: 'Pepe',
                email: 'pepe@sample.com',
            });

            mockUser = {
                uid: '1',
                name: 'Pepe',
                email: 'pepe@sample.com',
            };
            TestComponent = () => {
                const { userLogged, isLogged, setIsLogged, setUserLogged } =
                    useContext(AppContext);
                useEffect(() => {
                    setIsLogged(true);
                    // setUserLogged(initialContext.userLogged)
                    setUserLogged(mockUser);
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
        test('Context values should be used in the component', async () => {
            render(
                <AppContextProvider>
                    <TestComponent></TestComponent>
                </AppContextProvider>
            );
            let element1 = await screen.findByText(mockUser.name as string);
            let element2 = await screen.findByText('Logged');
            expect(element1).toBeInTheDocument();
            expect(element2).toBeInTheDocument();
            const button = screen.getByRole('button');
            userEvent.click(button);

            const element3 = screen.queryByText(mockUser.name as string);
            const element4 = screen.queryByText('Logged');
            expect(element3).not.toBeInTheDocument();
            expect(element4).not.toBeInTheDocument();
        });
    });
});
