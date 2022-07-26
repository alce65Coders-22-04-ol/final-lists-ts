// Flux ´Redux
// Una función pura (no depende ni mdifica nada externo)
// Recibe un estado y una acción, retorna un nuevo estado

import { NoteModel } from '../models/note.model';
import { Action } from './notes.action.creators';
import { actionTypes } from './notes.action.types';

type actionNotes = Array<NoteModel> | NoteModel;

export function notesReducer(
    previousState: Array<NoteModel>,
    action: Action<actionNotes>
) {
    let state: Array<NoteModel>;
    switch (action.type) {
        case actionTypes['notes@load']:
            state = action.payload as Array<NoteModel>;
            break;
        case actionTypes['notes@add']:
            state = [...previousState, action.payload as NoteModel];
            break;
        case actionTypes['notes@delete']:
            state = previousState.filter((item) => item.id !== action.payload);
            break;
        case actionTypes['notes@update']:
            state = previousState.map((item) =>
                item.id === (action.payload as NoteModel).id
                    ? (action.payload as NoteModel)
                    : item
            );
            break;
        default:
            state = previousState;
    }

    return state;
}
