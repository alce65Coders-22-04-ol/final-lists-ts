import {
    getAuth,
    signInWithPopup,
    signOut,
    GoogleAuthProvider,
    OAuthCredential,
} from 'firebase/auth';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppContext } from '../context/context';
import { iContext } from '../interfaces/context';
import { useLogin } from './use.login';
import { LocalStore } from '../services/local.store';

jest.mock('firebase/auth');
jest.mock('../services/local.store');

LocalStore.prototype.getItem = jest.fn().mockReturnValue({});
LocalStore.prototype.setItem = jest.fn();

describe('Given Login component', () => {
    describe('When it has been instantiate', () => {
        let jsx: JSX.Element;
        let TestComponent: Function;
        let context: iContext;
        let btnLabel: string;
        beforeEach(() => {
            context = {
                isLogged: false,
                setIsLogged: jest.fn(),
                userLogged: { uid: '', name: '', email: '' },
                setUserLogged: jest.fn(),
            };
            (signInWithPopup as jest.Mock).mockResolvedValue({
                user: '',
            });
            (signOut as jest.Mock).mockResolvedValue({});
            GoogleAuthProvider.credentialFromResult = jest.fn(
                () => ({ accessToken: '' } as OAuthCredential)
            );
            (getAuth as jest.Mock).mockReturnValue({});

            TestComponent = ({ btnLabel }: { btnLabel: string }) => {
                const { handleClick } = useLogin();
                return (
                    <button
                        type="button"
                        onClick={() => {
                            handleClick();
                        }}
                    >
                        {btnLabel}
                    </button>
                );
            };
        });
        describe('In any case', () => {
            test('Login data is checked in local storage', async () => {
                // arrange
                btnLabel = 'Login';
                jsx = (
                    <AppContext.Provider value={context}>
                        <TestComponent btnLabel={btnLabel}></TestComponent>
                    </AppContext.Provider>
                );
                // act
                render(jsx);
                // assert
                await waitFor(() =>
                    expect(LocalStore.prototype.getItem).toHaveBeenCalledTimes(
                        1
                    )
                );
            });
        });
        describe('And the user is not logged', () => {
            beforeEach(() => {
                // arrange
                btnLabel = 'Login';
                context.isLogged = false;
                jsx = (
                    <AppContext.Provider value={context}>
                        <TestComponent btnLabel={btnLabel}></TestComponent>
                    </AppContext.Provider>
                );
            });
            test('When the user click login button, firebase is invoked', async () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                expect(signInWithPopup).toHaveBeenCalled();
                expect(await context.setIsLogged).toHaveBeenCalled();
                expect(await LocalStore.prototype.setItem).toHaveBeenCalled();
            });
            test('When the user click login button and no credential is provided by firebase', async () => {
                (
                    GoogleAuthProvider.credentialFromResult as jest.Mock
                ).mockReturnValue(null);
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                try {
                    userEvent.click(element);
                    await expect(signInWithPopup).toHaveBeenCalled();
                } catch (error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect((error as Error).message).toBe('No credential');
                }
            });
        });
        describe('And the user is logged', () => {
            beforeEach(() => {
                // arrange
                btnLabel = 'Logout';
                LocalStore.prototype.getItem = jest
                    .fn()
                    .mockReturnValue({ user: 'Test' });
                context.isLogged = true;

                jsx = (
                    <AppContext.Provider value={context}>
                        <TestComponent btnLabel={btnLabel}></TestComponent>
                    </AppContext.Provider>
                );
            });
            test('When the user click logout button, firebase is invoked', async () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                expect(signOut).toHaveBeenCalled();
                expect(await context.setIsLogged).toHaveBeenCalled();
            });
            test('When the user click logout button and not sign out is possible in firebase', async () => {
                (signOut as jest.Mock).mockRejectedValueOnce(
                    new Error('Imposible sign out')
                );
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                try {
                    userEvent.click(element);
                } catch (error) {
                    // eslint-disable-next-line jest/no-conditional-expect
                    expect((error as Error).message).toBe('Imposible sign out');
                }
            });
        });
    });
});
