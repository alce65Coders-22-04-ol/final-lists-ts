import { render, screen, waitFor } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import { NotesRepo } from '../services/notes.repository';
import { NoteModel } from '../models/note.model';
import { NotesProvider } from './notes.provider';
import { useContext, useEffect } from 'react';
import { NotesContext } from './notes.context';

jest.mock('../services/notes.repository');

describe('Given NotesProvider', () => {
    describe('When it has been used with a TestComponent', () => {
        let mockNotes: Array<NoteModel>;
        let mockNewNote: NoteModel;
        // let buttons: Array<HTMLElement>;
        beforeEach(() => {
            // arrange
            mockNotes = [
                {
                    id: '1',
                    title: 'First Test Note',
                    author: 'Pepe',
                    content: 'lorem ipsum ...',
                },
                {
                    id: '2',
                    title: 'Second Test Note',
                    author: 'Luisa',
                    content: 'lorem ipsum ...',
                },
            ];
            mockNewNote = {
                id: '3',
                title: 'Added Note',
                author: 'Ernesto',
                content: 'lorem ipsum ...',
            };
            NotesRepo.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue(mockNotes);
            NotesRepo.prototype.addItem = jest
                .fn()
                .mockResolvedValue(mockNewNote);
            NotesRepo.prototype.updateItem = jest.fn().mockResolvedValue({
                ...mockNewNote,
                title: 'Updated Note',
            });
            NotesRepo.prototype.deleteItem = jest.fn().mockResolvedValue({
                ok: true,
            });
        });

        test(`Then it renders the component with its initial state, and after that, 
                the received Notes should be rendered`, async () => {
            // arrange
            const componentTitle = /Lista de notas/i;
            const TestComponent = () => {
                const { notes, loadNotes } = useContext(NotesContext);
                loadNotes();
                return (
                    <>
                        <h2>Lista de notas</h2>
                        <p>{notes[0]?.title}</p>
                    </>
                );
            };

            const jsx = (
                <NotesProvider>
                    <TestComponent></TestComponent>
                </NotesProvider>
            );
            // act
            render(jsx);
            // assert
            const element = screen.getByText(componentTitle);
            expect(element).toBeInTheDocument();

            expect(NotesRepo.prototype.getAllItems).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText('First Test Note');
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the TestElement call addNte,
                "Added Note" should be render`, async () => {
            // arrange
            const mockNewNote = {
                id: '3',
                title: 'Added Note',
                author: 'Ernesto',
                content: 'lorem ipsum ...',
            };

            const TestComponent = () => {
                const { notes, loadNotes, addNote } = useContext(NotesContext);
                loadNotes();
                useEffect(() => {
                    addNote(mockNewNote);
                }, [addNote]);
                return (
                    <>
                        <h2>Lista de notas</h2>
                        <p>{notes[2]?.title}</p>
                    </>
                );
            };
            const jsx = (
                <NotesProvider>
                    <TestComponent></TestComponent>
                </NotesProvider>
            );

            // act
            render(jsx);
            expect(NotesRepo.prototype.addItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText(mockNewNote.title);
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the TestElement call updateNote
                "Updated Note" should be render`, async () => {
            // arrange
            mockNotes = [...mockNotes, { ...mockNewNote }];
            mockNewNote.title = 'Updated Note';
            NotesRepo.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue(mockNotes);
            const TestComponent = () => {
                const { notes, loadNotes, updateNote } =
                    useContext(NotesContext);
                loadNotes();
                useEffect(() => {
                    updateNote(mockNewNote);
                }, [updateNote]);
                return (
                    <>
                        <h2>Lista de notas</h2>
                        <p>{notes[2]?.title}</p>
                    </>
                );
            };
            const jsx = (
                <NotesProvider>
                    <TestComponent></TestComponent>
                </NotesProvider>
            );
            // act
            render(jsx);
            expect(NotesRepo.prototype.updateItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText(mockNewNote.title);
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the TestElement call deleteNote
               "Updated Note" should not be render`, async () => {
            // handleClickDelete -> NotesRepo.prototype.deleteItem
            // arrange
            const userInputMock = 'First Test Note';
            const TestComponent = () => {
                const { notes, loadNotes, deleteNote } =
                    useContext(NotesContext);
                loadNotes();
                useEffect(() => {
                    deleteNote('1');
                }, [deleteNote]);

                return (
                    <>
                        <h2>Lista de notas</h2>
                        <p>{notes[0]?.title}</p>
                        <p>{notes[1]?.title}</p>
                    </>
                );
            };
            const jsx = (
                <NotesProvider>
                    <TestComponent></TestComponent>
                </NotesProvider>
            );
            // act
            render(jsx);
            expect(NotesRepo.prototype.deleteItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.queryByText(userInputMock);
                expect(element).toBeNull();
            });
        });
        test(`If the TestElement call deleteNote
                for a non existing item
               nothing should be render`, async () => {
            // handleClickDelete -> NotesRepo.prototype.deleteItem
            // arrange
            NotesRepo.prototype.deleteItem = jest.fn().mockResolvedValue({
                ok: false,
            });
            const userInputMock = 'First Test Note';
            const TestComponent = () => {
                const { notes, loadNotes, deleteNote } =
                    useContext(NotesContext);
                loadNotes();
                useEffect(() => {
                    deleteNote('3');
                }, []);

                return (
                    <>
                        <h2>Lista de notas</h2>
                        <p>{notes[0]?.title}</p>
                        <p>{notes[1]?.title}</p>
                    </>
                );
            };
            const jsx = (
                <NotesProvider>
                    <TestComponent></TestComponent>
                </NotesProvider>
            );
            // act
            render(jsx);

            expect(NotesRepo.prototype.deleteItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.queryByText(userInputMock);
                expect(element).toBeInTheDocument();
            });
        });
    });
});
