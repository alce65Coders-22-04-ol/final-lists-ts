import { render, screen } from '@testing-library/react';
import { Login } from './login';

import * as hook from '../../hooks/use.login';
import userEvent from '@testing-library/user-event';

jest.mock('../../hooks/use.login');

describe('Given Login component', () => {
    describe('When it has been instantiate', () => {
        let jsx: JSX.Element;
        let handleClick: Function;

        describe('And the user is not logged', () => {
            let btnLabel: string;
            beforeEach(() => {
                // arrange
                (hook.useLogin as jest.Mock).mockReturnValue({
                    handleClick: jest.fn(),
                    isLogged: false,
                });
                handleClick = hook.useLogin().handleClick;
                btnLabel = 'Login';
                jsx = <Login />;
            });
            test('Then it renders a button for login', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                expect(element).toBeInTheDocument();
            });
            test('Then handleClick will be run after button login was click', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                expect(handleClick).toHaveBeenCalled();
            });
        });
        describe('And the user is logged', () => {
            let btnLabel: string;
            beforeEach(() => {
                // arrange
                (hook.useLogin as jest.Mock).mockReturnValue({
                    handleClick: jest.fn(),
                    isLogged: true,
                });
                handleClick = hook.useLogin().handleClick;
                btnLabel = 'Logout';
                jsx = <Login />;
            });
            test('Then it renders a button for logout', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                expect(element).toBeInTheDocument();
            });
            test('Then handleClick will be run after button login was click', () => {
                // act
                render(jsx);
                // assert
                const element = screen.getByText(btnLabel);
                userEvent.click(element);
                expect(handleClick).toHaveBeenCalled();
            });
        });
    });
});
