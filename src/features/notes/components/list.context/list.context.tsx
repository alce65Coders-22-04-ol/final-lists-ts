import { useState, useContext, useEffect } from 'react';
import { NoteModel } from '../../models/note.model';

import notes from './list.context.module.css';
import { NotesContext } from '../../context/notes.context';

let mockData: Partial<NoteModel> = {
    title: 'Acerca de las Notas',
    author: 'Pepe',
    content:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur quos, quae suscipit impedit reiciendis modi ad eaque quo ipsam magni reprehenderit doloremque facere deserunt similique sint earum rerum nulla quam.',
};

export function ListContext() {
    /**
     * Al utilizar flux/redux en el contexto ...
     */

    const {
        notes: notesState,
        loadNotes,
        addNote,
        deleteNote,
        updateNote,
    } = useContext(NotesContext);

    useEffect(() => {
        loadNotes();
    }, [loadNotes]);

    const [hasNotBeenAdded, setNotAdded] = useState(true);

    const handleClickAdd = () => {
        addNote(mockData as NoteModel);
        setNotAdded(false);
    };

    const handleClickUpdate = () => {
        mockData = {
            id: (notesState.at(-1) as NoteModel).id,
            title: 'Updated Note',
        };
        updateNote(mockData);
    };

    const handleClickDelete = () => {
        deleteNote((notesState.at(-1) as NoteModel).id);
        setNotAdded(true);
    };

    return (
        <section>
            <h3>Lista de notas (Estado en el contexto)</h3>
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
