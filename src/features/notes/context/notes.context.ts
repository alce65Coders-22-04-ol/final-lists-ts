import { createContext } from 'react';
import { NoteModel } from '../models/note.model';

export interface InitialContext {
    notes: Array<NoteModel>;
    loadNotes: () => void;
    addNote: (note: NoteModel) => void;
    updateNote: (note: Partial<NoteModel>) => void;
    deleteNote: (id: string) => void;
}

export const initialContext: InitialContext = {
    notes: [],
    loadNotes: () => {
        // used for set the state loading the notes
    },
    addNote: (_note) => {
        // used for set the state adding a note
    },
    updateNote: (_note) => {
        // used for set the state updating a note
    },
    deleteNote: (_id) => {
        // used for set the state deleting a note
    },
};

export const NotesContext = createContext(initialContext);
