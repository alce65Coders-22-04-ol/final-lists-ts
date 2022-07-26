import { notesReducer } from './notes.reducer';
import * as ac from './notes.action.creators';
import { NoteModel } from '../models/note.model';
import { actionTypes } from './notes.action.types';

describe('Given Notes reducer', () => {
    describe('When it has been instantiate with an initial state', () => {
        let initialState: Array<NoteModel>;
        let mockNote: NoteModel;
        beforeAll(() => {
            mockNote = {
                id: '1',
                title: 'Test Note',
                author: 'Pepe',
                content: '',
            };
            initialState = [];
        });
        test('Then if the action is load', () => {
            // arrange
            const action = ac.loadNotesAction([mockNote]);
            // act
            const result = notesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockNote]);
        });
        test('Then if the action is add', () => {
            // arrange
            const action = ac.addNoteAction(mockNote);
            // act
            const result = notesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockNote]);
        });
        test('Then if the action is update', () => {
            // arrange
            initialState = [mockNote, { ...mockNote, id: '2' }];
            const updateData = {
                id: '1',
                title: 'Update Note',
                author: 'Pepe',
                content: '',
            };
            const action = ac.updateNoteAction(updateData);
            // act
            const result = notesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([
                updateData,
                { ...mockNote, id: '2' },
            ]);
        });
        test('Then if the action is delete', () => {
            // arrange
            initialState = [mockNote];
            const action = ac.deleteNoteAction(mockNote.id);
            // act
            const result = notesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([]);
        });
        test('Then if the action is unknown', () => {
            // arrange
            initialState = [mockNote];
            const type = 'unknown' as actionTypes;
            const action = { type, payload: '' };
            // act
            const result = notesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockNote]);
        });
    });
});
