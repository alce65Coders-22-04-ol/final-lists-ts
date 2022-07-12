import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { iTask, iTaskInput } from '../../models/task';
import { useTasks } from '../../hooks/use.tasks';
import AppInput from '../../../../infrastructure/components/input/app.input';
import { AppButton } from '../../../../infrastructure/components/button/app.button';

export function AddOrEdit() {
    const { addTask, updateTask, getContext } = useTasks();
    const { taskToEdit: task } = getContext();

    console.log('Starting AddOrEdit', task);

    const initialState: iTaskInput = {
        title: '',
        responsible: '',
        isCompleted: false,
    };

    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if (task) {
            const updateState: iTask = {
                id: task.id,
                title: task.title,
                responsible: task.responsible,
                isCompleted: task.isCompleted,
            };
            setFormState(updateState);
        }
    }, [task]);

    const [validState, setValidState] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        if (task) {
            makeUpdateTask();
        } else {
            makeAddTask();
        }
    };

    const makeAddTask = () => {
        const formData: iTaskInput = {
            title: formState.title as string,
            responsible: formState.responsible as string,
            isCompleted: false,
        };
        addTask(formData);
        setFormState(initialState);
        setValidState(false);
    };

    const makeUpdateTask = () => {
        if (!task) return;
        const formData: iTaskInput = {
            title: formState.title as string,
            responsible: formState.responsible as string,
            isCompleted: task.isCompleted,
        };
        updateTask((task as iTask).id, formData);
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
            <AppButton type="submit" disabled={!validState}>
                {task ? 'Guardar' : 'Añadir'}
            </AppButton>
        </form>
    );
}
