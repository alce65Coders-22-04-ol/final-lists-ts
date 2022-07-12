import { SyntheticEvent, useRef, useState } from 'react';
// import { TodoContext } from '../../../context/todo.context';
import { iTaskInput } from '../../models/task';
import AppInput from '../../../../infrastructure/components/input/app.input';
import { useTasks } from '../../hooks/use.tasks';

export function Add() {
    const { addTask } = useTasks();

    const initialState: iTaskInput = {
        title: '',
        responsible: '',
        isCompleted: false,
    };
    const [formState, setFormState] = useState(initialState);
    const [validState, setValidState] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        const formData: iTaskInput = {
            title: formState.title as string,
            responsible: formState.responsible as string,
            isCompleted: false,
        };
        addTask(formData);
        setFormState(initialState);
        setValidState(false);
    };

    const inputs: Array<{
        name: keyof typeof formState;
        placeholder: string;
        required: boolean;
    }> = [
        { name: 'title', placeholder: 'Describe la tarea', required: true },
        {
            name: 'responsible',
            placeholder: 'Responsable de la tarea',
            required: false,
        },
    ];

    return (
        <form onSubmit={handleSubmit} ref={formRef}>
            {inputs.map((item) => (
                <AppInput
                    key={item.name as string}
                    name={item.name as string}
                    formInfo={{
                        setFormState,
                        setValidState,
                        formRef,
                    }}
                    placeholder={item.placeholder as string}
                    required={item.required as boolean}
                    initialValue={formState[item.name] as string}
                />
            ))}
            <button type="submit" disabled={!validState}>
                Guardar
            </button>
        </form>
    );
}
