// import { useEffect } from 'react';
import { useState, useMemo, useReducer, useEffect } from 'react';
import { NoteModel } from '../../models/note.model';
import { notesReducer } from '../../reducers/notes.reducer';
import { NotesRepo } from '../../services/notes.repository';

import * as ac from '../../reducers/notes.action.creators';
import notes from './list.module.css';

let mockData: Partial<NoteModel> = {
    id: '',
    title: 'Acerca de las Notas',
    author: 'Pepe',
    content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quos, quae suscipit impedit reiciendis modi ad eaque quo ipsam magni reprehenderit doloremque facere deserunt similique sint earum rerum nulla quam.',
};

export function List() {
    /**
     * Al utilizar flux/redux, useReducer es en cierto modo el equivalente a
     * const [notesState] = useState(initialState)
     * al definir la variable a la que asignamos la rama del estado seleccionada
     */

    const initialState: Array<NoteModel> = [];
    const [notesState, dispatch] = useReducer(notesReducer, initialState);

    const [hasNotBeenAdded, setNotAdded] = useState(true);

    const repo = useMemo(() => {
        return new NotesRepo();
    }, []);

    useEffect(() => {
        repo.getAllItems().then((data) => dispatch(ac.loadNotesAction(data)));
    }, [repo, dispatch]);

    const handleClickAdd = () => {
        repo.addItem(mockData as NoteModel).then((data) => {
            mockData.id = data.id;
            dispatch(ac.addNoteAction(data));
            setNotAdded(false);
        });
    };

    const handleClickUpdate = () => {
        mockData = {
            id: mockData.id,
            title: 'Upadated Note',
        };
        repo.updateItem(mockData).then((data) =>
            dispatch(ac.updateNoteAction(data))
        );
    };

    const handleClickDelete = () => {
        repo.deleteItem(mockData.id as string).then((data) => {
            if (data.ok) {
                dispatch(ac.deleteNoteAction(mockData.id as string));
            }
        });
        setNotAdded(true);
    };

    return (
        <section>
            <h3>Lista de notas (Estado standalone)</h3>
            <div className={notes.buttons}>
                <button onClick={handleClickAdd} hidden={!hasNotBeenAdded}>
                    Añadir nota
                </button>
                <button onClick={handleClickUpdate} hidden={hasNotBeenAdded}>
                    Modificar nota
                </button>
                <button onClick={handleClickDelete} hidden={hasNotBeenAdded}>
                    Borrar nota
                </button>
            </div>
            <ul className={notes.list}>
                {notesState.map((item) => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        </section>
    );
}
