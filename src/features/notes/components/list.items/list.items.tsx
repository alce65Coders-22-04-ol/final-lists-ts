import { MouseEventHandler } from 'react';
import { NoteModel } from '../../models/note.model';
import notes from './list.module.css';
export function ListItems({
    handleClickAdd,
    handleClickUpdate,
    handleClickDelete,
    hasNotBeenAdded,
    notesState,
}: {
    handleClickAdd: MouseEventHandler<HTMLButtonElement>;
    handleClickUpdate: MouseEventHandler<HTMLButtonElement>;
    handleClickDelete: MouseEventHandler<HTMLButtonElement>;
    hasNotBeenAdded: boolean;
    notesState: Array<NoteModel>;
}) {
    return (
        <>
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
        </>
    );
}
