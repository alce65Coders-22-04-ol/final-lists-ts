import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ContactForm } from './contact.form';

describe('Given Contact Form component', () => {
    describe('When it has been instantiate and rendered', () => {
        test('Then it should collect the information typing in the inputs', () => {
            // arrange

            const jsx = <ContactForm></ContactForm>;
            // act
            render(jsx);
            // assert
            const inputs = screen.getAllByRole('textbox');
            const button = screen.getByRole('button');
            // const element = screen.getByText();
            expect(inputs[0]).toBeInTheDocument();
            expect(inputs[1]).toBeInTheDocument();
            userEvent.type(inputs[0], 'Pepe');
            fireEvent.blur(inputs[0]);
            userEvent.type(inputs[1], 'pepe@sample.com');
            fireEvent.blur(inputs[1]);
            userEvent.click(button);
            expect(screen.getByText(/Gracias Pepe/i)).toBeInTheDocument();
            expect(screen.getByRole('log')).toBeInTheDocument();
        });
    });
});
