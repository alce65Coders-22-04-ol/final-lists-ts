import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { AppInputText } from './app.input';

describe('Given AppInput component', () => {
    describe('When it has been instantiate and a input is rendered', () => {
        let TestComponent: Function;

        beforeEach(() => {
            TestComponent = ({ required }: { required: string }) => {
                // let formState: { title: string };
                // let setFormState: Function;
                const initialState = { title: '' };
                const [formState, setFormState] = useState(initialState);

                return (
                    <form>
                        <AppInputText
                            placeholder="Describe la tarea"
                            name="title"
                            formState={formState}
                            setFormState={setFormState}
                            required={required}
                        />
                        <output>{formState.title}</output>
                    </form>
                );
            };
        });
        describe('And the input is required', () => {
            test('Then the user input should be added to de state', () => {
                // arrange
                const inputText = 'Tarea test';
                // act
                render(<TestComponent required="true" />);
                // assert
                const element = screen.getByRole('textbox');
                expect(element).toBeInTheDocument();
                userEvent.type(element, inputText);
                const output = screen.getByText(inputText);
                expect(output).toBeInTheDocument();
            });
        });
        describe('And the input is not required', () => {
            test('Then the user input should be added to de state', () => {
                // arrange
                const inputText = 'Tarea test';
                // act
                render(<TestComponent required="false" />);
                // assert
                const element = screen.getByRole('textbox');
                expect(element).toBeInTheDocument();
                userEvent.type(element, inputText);
                const output = screen.getByText(inputText);
                expect(output).toBeInTheDocument();
            });
        });
    });
});
