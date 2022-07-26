import { useState, useContext, useEffect } from 'react';
import { NoteModel } from '../../models/note.model';

import { NotesContext } from '../../context/notes.context';
import { ListItems } from '../list.items/list.items';

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
            <ListItems
                handleClickAdd={handleClickAdd}
                handleClickUpdate={handleClickUpdate}
                handleClickDelete={handleClickDelete}
                hasNotBeenAdded={hasNotBeenAdded}
                notesState={notesState}
            ></ListItems>
        </section>
    );
}
