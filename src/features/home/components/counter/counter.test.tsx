import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Counter } from './counter';

describe('Given Counter component', () => {
    describe('When it has been instantiate ...', () => {
        let jsx: JSX.Element;
        let title: string;
        let setTT: jest.Mock;
        beforeEach(() => {
            // arrange
            title = 'Contador ';
            setTT = jest.fn();
            jsx = <Counter setTT={setTT} />;
        });
        test('Then it renders the title with 0 as count value', () => {
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title + '0');
            expect(element).toBeInTheDocument();
        });
        test('Then it renders the title with counter value 1 after a button [+] click', () => {
            // act
            render(jsx);
            // assert
            const buttons = screen.getAllByRole('button');
            userEvent.click(buttons[0]);
            const element = screen.getByText(title + '1');
            expect(element).toBeInTheDocument();
            expect(setTT).toHaveBeenCalled();
        });
        test('Then it renders the title with counter value -1 after a button [-] click', () => {
            // act
            render(jsx);
            // assert
            const buttons = screen.getAllByRole('button');
            userEvent.click(buttons[1]);
            const element = screen.getByText(title + '-1');
            expect(element).toBeInTheDocument();
            expect(setTT).toHaveBeenCalled();
        });
    });
});
