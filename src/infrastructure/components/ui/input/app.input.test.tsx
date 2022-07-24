import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useRef, useState } from 'react';
import AppInput from './app.input';

describe('Given AppInput component', () => {
    describe('When it has been instantiate and a input is rendered', () => {
        let TestComponent: Function;
        beforeEach(() => {
            TestComponent = ({ required }: { required: boolean }) => {
                // let formState: { title: string };
                // let setFormState: Function;
                const initialState = { title: '' };
                const [formState, setFormState] = useState(initialState);
                const [validState, setValidState] = useState(false);
                const formRef = useRef<HTMLFormElement>(null);

                return (
                    <form ref={formRef}>
                        <AppInput
                            placeholder="Describe la tarea"
                            name="title"
                            formInfo={{
                                setFormState,
                                setValidState,
                                formRef,
                            }}
                            required={required}
                        />
                        <output>{validState && formState.title}</output>
                    </form>
                );
            };
        });
        describe('And the input is required', () => {
            test('Then the user input should be added to de state', () => {
                // arrange
                const inputText = 'Tarea test';
                // act
                render(<TestComponent required={true} />);
                // assert
                const element: HTMLInputElement = screen.getByRole('textbox');
                expect(element).toBeInTheDocument();
                userEvent.type(element, inputText);
                fireEvent.blur(element);
                const output = screen.getByText(inputText);
                expect(output).toBeInTheDocument();
            });
            test('Then if input is not completed, an error message should be rendered', () => {
                // act
                render(<TestComponent required={true} />);
                // assert
                const element: HTMLInputElement = screen.getByRole('textbox');
                fireEvent.blur(element);
                const error = screen.getByText(/Constraints not satisfied/i);
                expect(error).toBeInTheDocument();
            });
        });
        describe('And the input is not required', () => {
            test('Then the user input should be added to de state', () => {
                // arrange
                const inputText = 'Tarea test';
                // act
                render(<TestComponent />);
                // assert
                const element = screen.getByRole('textbox');
                expect(element).toBeInTheDocument();
                userEvent.type(element, inputText);
                fireEvent.blur(element);
                const output = screen.getByText(inputText);
                expect(output).toBeInTheDocument();
            });
        });
    });
});
