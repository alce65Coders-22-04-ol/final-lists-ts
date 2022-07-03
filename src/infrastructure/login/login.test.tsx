import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    OAuthCredential,
} from 'firebase/auth';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Login } from './login';
import { Context, iContext } from '../context/context';

jest.mock('firebase/auth');

describe('Given Login component', () => {
    describe('When it has been instantiate', () => {
        let jsx: JSX.Element;
        beforeEach(() => {
            (signInWithPopup as jest.Mock).mockResolvedValue({
                user: '',
            });
            GoogleAuthProvider.credentialFromResult = jest.fn(
                () => ({ accessToken: '' } as OAuthCredential)
            );
            (getAuth as jest.Mock).mockReturnValue({});
        });
        describe('And the user is not logged', () => {
            let btnLabel: string;
            let context: iContext;
            beforeEach(() => {
                // arrange
                btnLabel = 'Login';
                context = {
                    isLogged: false,
                    setIsLogged: jest.fn(),
                };
                jsx = (
                    <Context.Provider value={context}>
                        <Login />
                    </Context.Provider>
                );
            });
            test('Then it renders a button for login', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                expect(element).toBeInTheDocument();
            });
            test('When the user click login button, firebase is invoked', async () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                expect(signInWithPopup).toHaveBeenCalled();
                expect(await context.setIsLogged).toHaveBeenCalled();
            });
            test('When the user click login button and no credential is provided by firebase', () => {
                (
                    GoogleAuthProvider.credentialFromResult as jest.Mock
                ).mockReturnValue(null);
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                try {
                    userEvent.click(element);
                    expect(signInWithPopup).toHaveBeenCalled();
                } catch (error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect((error as Error).message).toBe('No credential');
                }
            });
        });
        describe('And the user is logged', () => {
            let btnLabel: string;
            let context: iContext;
            beforeEach(() => {
                // arrange
                btnLabel = 'Logout';
                context = {
                    isLogged: true,
                    setIsLogged: jest.fn(),
                };
                jsx = (
                    <Context.Provider value={context}>
                        <Login />
                    </Context.Provider>
                );
            });
            test('Then it renders a button for logout', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                expect(element).toBeInTheDocument();
            });
            test('When the user click login button, firebase is invoked', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                expect(context.setIsLogged).toHaveBeenCalled();
            });
        });
    });
});
