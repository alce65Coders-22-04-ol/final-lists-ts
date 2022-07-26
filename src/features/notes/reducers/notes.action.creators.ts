import { NoteModel } from '../models/note.model';
import { actionTypes } from './notes.action.types';

export interface Action<T> {
    type: actionTypes;
    payload: T | string;
}

export const loadNotesAction = (
    notes: Array<NoteModel>
): Action<Array<NoteModel>> => ({
    type: actionTypes['notes@load'],
    payload: notes,
});

export const addNoteAction = (note: NoteModel): Action<NoteModel> => ({
    type: actionTypes['notes@add'],
    payload: note,
});

export const updateNoteAction = (note: NoteModel): Action<NoteModel> => ({
    type: actionTypes['notes@update'],
    payload: note,
});

export const deleteNoteAction = (id: string): Action<NoteModel> => ({
    type: actionTypes['notes@delete'],
    payload: id,
});
