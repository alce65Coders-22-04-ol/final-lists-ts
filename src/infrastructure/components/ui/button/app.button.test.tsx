import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MouseEventHandler } from 'react';
import { AppButton } from './app.button';

describe('Given AppButton component', () => {
    describe('When it has been instantiate in a test component', () => {
        let TestComponent: Function;
        let onClick: MouseEventHandler<HTMLButtonElement>;
        let label: string;
        beforeEach(() => {
            onClick = jest.fn();
            label = 'Test Button';
            TestComponent = () => (
                <AppButton onClick={onClick}>{label}</AppButton>
            );
        });

        test('Then it renders a button with the provided label', () => {
            // arrange
            const jsx = <TestComponent></TestComponent>;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(label);
            expect(element).toBeInTheDocument();
            userEvent.click(element);
            expect(onClick).toHaveBeenCalled();
        });
    });
});
