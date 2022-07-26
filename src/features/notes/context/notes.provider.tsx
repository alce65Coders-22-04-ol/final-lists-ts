import { useReducer, useCallback, useMemo } from 'react';
import { NoteModel } from '../models/note.model';
import { notesReducer } from '../reducers/notes.reducer';
import { NotesContext } from './notes.context';

import * as act from '../reducers/notes.action.creators';
import { NotesRepo } from '../services/notes.repository';

export function NotesProvider({ children }: { children: JSX.Element }) {
    const repo = useMemo(() => new NotesRepo('notes-context'), []);

    const initialState: Array<NoteModel> = [];
    // const [notes, setNotes] = useState(initialState);
    const [notes, dispatch] = useReducer(notesReducer, initialState);

    const loadNotes = useCallback(() => {
        // petición al backend
        repo.getAllItems().then((notes: Array<NoteModel>) => {
            // setter del estado
            dispatch(act.loadNotesAction(notes));
        });
    }, [repo]);

    const addNote = (note: NoteModel) => {
        // petición albBackend
        repo.addItem(note).then((data) =>
            // setter del estado
            dispatch(act.addNoteAction(data))
        );
    };

    const updateNote = (note: Partial<NoteModel>) => {
        repo.updateItem(note).then((data) =>
            dispatch(act.updateNoteAction(data))
        );
    };

    const deleteNote = (id: NoteModel['id']) => {
        repo.deleteItem(id).then((resp) => {
            if (resp.ok) {
                dispatch(act.deleteNoteAction(id));
            }
        });
    };

    const context = {
        notes,
        loadNotes,
        addNote,
        updateNote,
        deleteNote,
    };

    return (
        <NotesContext.Provider value={context}>
            {children}
        </NotesContext.Provider>
    );
}
