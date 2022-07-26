import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { InitialContext, NotesContext } from '../../context/notes.context';
import { ListContext } from './list.context';

describe('Given ListContext component', () => {
    let context: InitialContext;
    let jsx: JSX.Element;
    let buttons: Array<HTMLElement>;
    beforeEach(() => {
        const mockNote = {
            id: '1',
            title: 'Sample Note',
            author: 'Ernesto',
            content: 'lorem ipsum ...',
        };

        context = {
            notes: [mockNote],
            loadNotes: jest.fn(),
            addNote: jest.fn(),
            updateNote: jest.fn(),
            deleteNote: jest.fn(),
        };
        jsx = (
            <NotesContext.Provider value={context}>
                <ListContext></ListContext>
            </NotesContext.Provider>
        );
    });
    describe('When it has been instantiate inside mocked context', () => {
        test('Then it renders the component and call loadNotes from the context', () => {
            // arrange
            const componentTitle = /Lista de notas/i;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(componentTitle);
            expect(element).toBeInTheDocument();
            expect(context.loadNotes).toHaveBeenCalled();
        });
        test('If user click on button "Añadir", the method addNote should be called from the context', () => {
            // act
            render(jsx);
            buttons = screen.getAllByRole('button');
            userEvent.click(buttons[0]);
            // assert
            expect(context.addNote).toHaveBeenCalled();
        });
        test('If user click on button "Modificar", the method updateNote should be called from the context', () => {
            // act
            render(jsx);
            buttons = screen.getAllByRole('button', { hidden: true });
            buttons[1].removeAttribute('hidden');
            userEvent.click(buttons[1]);
            // assert
            expect(context.updateNote).toHaveBeenCalled();
        });
        test('If user click on button "Borrar", the method deleteNote should be called from the context', () => {
            // act
            render(jsx);
            buttons = screen.getAllByRole('button', { hidden: true });
            buttons[2].removeAttribute('hidden');
            userEvent.click(buttons[2]);
            // assert
            expect(context.deleteNote).toHaveBeenCalled();
        });
    });
});
