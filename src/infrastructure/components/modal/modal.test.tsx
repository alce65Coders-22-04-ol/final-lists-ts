import { render, screen } from '@testing-library/react';
import { AppModal } from './modal';

describe('Given Modal component', () => {
    describe('When it has been instantiate inside a component', () => {
        let TestComponent: Function;
        let show: boolean;
        let title: string;
        beforeEach(() => {
            title = 'Modal Component';
            show = false;
            TestComponent = () => (
                <>
                    <button>Show modal</button>
                    <AppModal title={title} show={show}>
                        <p>Información</p>
                    </AppModal>
                </>
            );
        });
        test('Then it will be render if show prop is true', () => {
            // arrange
            show = true;
            // act

            render(<TestComponent></TestComponent>);

            // assert
            const element = screen.getByRole('dialog', { hidden: true });
            expect(element).toBeInTheDocument();
            expect(element).toHaveAttribute('open');
        });
        test('Then it will not be render if show prop is false.', () => {
            // arrange
            show = false;
            // act
            render(<TestComponent></TestComponent>);

            // assert
            const element = screen.getByRole('dialog', { hidden: true });
            expect(element).toBeInTheDocument();
            expect(element).not.toHaveAttribute('open');
        });
    });
});
