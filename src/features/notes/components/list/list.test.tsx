import { act, render, screen, waitFor } from '@testing-library/react';
import { List } from './list';
import { NotesRepo } from '../../services/notes.repository';
import { NoteModel } from '../../models/note.model';
import userEvent from '@testing-library/user-event';

jest.mock('../../services/notes.repository');

describe('Given List component', () => {
    describe('When it has been instantiate with a default state []', () => {
        let mockNotes: Array<NoteModel>;
        let mockNewNote: NoteModel;
        let buttons: Array<HTMLElement>;
        let jsx: JSX.Element;
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

            jsx = <List></List>;
        });

        test(`Then it renders the component with its initial state, and after that, 
                the received Notes should be rendered`, async () => {
            // arrange
            const componentTitle = /Lista de notas/i;
            // act
            render(jsx);
            buttons = screen.getAllByRole('button');
            // assert
            const element = screen.getByText(componentTitle);
            expect(element).toBeInTheDocument();

            expect(NotesRepo.prototype.getAllItems).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText('First Test Note');
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the user click "Añadir nota" button, 
                "Added Note" should be render`, async () => {
            // handleClickAdd -> NotesRepo.prototype.addItem
            // arrange
            const userInputMock = 'Added Note';
            // act
            render(jsx);
            buttons = screen.getAllByRole('button');
            userEvent.click(buttons[0]);
            expect(NotesRepo.prototype.addItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText(userInputMock);
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the user click "Modificar nota" button
                "Updated Note" should be render`, async () => {
            //   handleClickUpdate -> NotesRepo.prototype.updateItem
            // arrange
            const userInputMock = 'Updated Note';
            mockNotes = [...mockNotes, mockNewNote];
            NotesRepo.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue(mockNotes);
            // act
            render(jsx);
            buttons = screen.getAllByRole('button', { hidden: true });
            buttons[1].removeAttribute('hidden');
            userEvent.click(buttons[1]);

            expect(NotesRepo.prototype.updateItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText(userInputMock);
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the user click "Borrar nota" button
               "Updated Note" should not be render`, async () => {
            // handleClickDelete -> NotesRepo.prototype.deleteItem
            // arrange
            const userInputMock = 'Updated Note';
            // act
            render(jsx);
            buttons = screen.getAllByRole('button', { hidden: true });
            buttons[2].removeAttribute('hidden');
            userEvent.click(buttons[2]);
            expect(NotesRepo.prototype.deleteItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.queryByText(userInputMock);
                expect(element).toBeNull();
            });
        });
        test(`If the user click "Borrar nota" button 
                for a non existing item
               nothing should be render`, async () => {
            // handleClickDelete -> NotesRepo.prototype.deleteItem
            // arrange
            NotesRepo.prototype.deleteItem = jest.fn().mockResolvedValue({
                ok: false,
            });

            // act
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                // formato usado para corregir el warning que aparece al final
                render(jsx);
            });

            buttons = screen.getAllByRole('button', {
                hidden: true,
            });
            buttons[1].removeAttribute('hidden');
            buttons[2].removeAttribute('hidden');
            userEvent.click(buttons[2]);

            expect(NotesRepo.prototype.deleteItem).toHaveBeenCalled();
        });
    });
});
