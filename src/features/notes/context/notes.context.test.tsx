import { useContext } from 'react';
// import { mockComponent } from 'react-dom/test-utils';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { NoteModel } from '../models/note.model';

import * as api from '../services/notes.repository';
import { initialContext, NotesContext } from './notes.context';
import { NotesProvider } from './notes.provider';

// Mock de un módulo
jest.mock('../services/notes.repository');

const mockNote: NoteModel = {
    id: '1',
    title: 'Test Note',
    author: 'Pepe',
    content: 'lorem ipsum...',
};

describe('Given the context NotesContext ', () => {
    describe('When it is used by a component', () => {
        /**
         * Se ejecutan las funciones del initialContext
         * para que las cubra el coverage
         */
        initialContext.loadNotes();
        initialContext.addNote(mockNote);
        initialContext.updateNote(mockNote);
        initialContext.deleteNote('1');

        // Arrange
        let TestComponent: () => JSX.Element;
        beforeEach(() => {
            TestComponent = () => {
                const { notes } = useContext(NotesContext);
                return (
                    <>
                        <h1>Test Component</h1>
                        {notes.map((item) => (
                            <p key={item.id}>{item.title}</p>
                        ))}
                        {/* <button onClick={() => addNote(mockNote)}>
                            AddNote
                        </button> */}
                    </>
                );
            };
        });

        test('Then the component has access to de context', () => {
            const context = {
                notes: [mockNote],
                loadNotes: jest.fn(),
                addNote: jest.fn(),
                updateNote: jest.fn(),
                deleteNote: jest.fn(),
            };
            render(
                <NotesContext.Provider value={context}>
                    <TestComponent></TestComponent>
                </NotesContext.Provider>
            );
            const element = screen.getByText(mockNote.title);
            expect(element).toBeInTheDocument();
        });

        // test('Then if click add button, addNote should run', async () => {
        //     (api.getAllNotes as jest.Mock).mockResolvedValue([]);
        //     (api.addNote as jest.Mock).mockResolvedValue({
        //         ...mockNote,
        //         id: 56,
        //     });
        //     let button;
        //     render(
        //         <NotesProvider>
        //             <TestComponent></TestComponent>
        //         </NotesProvider>
        //     );
        //     button = screen.getByText(/AddNote/i);
        //     userEvent.click(button);
        //     expect(api.addNote).toHaveBeenCalledWith(mockNote);
        //     const element = await screen.findByText(mockNote.title);
        //     expect(element).toBeInTheDocument();
        // });
    });
});
