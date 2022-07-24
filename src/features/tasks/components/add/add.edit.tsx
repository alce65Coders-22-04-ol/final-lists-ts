import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { iTask, iTaskInput } from '../../models/task';
import { useTasks } from '../../hooks/use.tasks';
import AppInput from '../../../../infrastructure/components/input/app.input';
import { AppButton } from '../../../../infrastructure/components/button/app.button';

export function AddOrEdit() {
    const { addTask, updateTask, getContext } = useTasks();
    const { taskToEdit } = getContext();

    const initialState: iTaskInput = {
        title: '',
        responsible: '',
        isCompleted: false,
    };

    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if (taskToEdit) {
            const updateState: iTask = {
                id: taskToEdit.id,
                title: taskToEdit.title,
                responsible: taskToEdit.responsible,
                isCompleted: taskToEdit.isCompleted,
            };
            setFormState(updateState);
        }
    }, [taskToEdit]);

    const [validState, setValidState] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        if (taskToEdit) {
            makeUpdateTask(taskToEdit);
        } else {
            makeAddTask();
        }
    };

    const makeAddTask = () => {
        const formData: iTaskInput = {
            title: formState.title,
            responsible: formState.responsible,
            isCompleted: false,
        };
        addTask(formData);
        setFormState(initialState);
        setValidState(false);
    };

    const makeUpdateTask = (task: iTask) => {
        const formData: iTaskInput = {
            title: formState.title,
            responsible: formState.responsible,
            isCompleted: task.isCompleted,
        };
        updateTask(task.id, formData);
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
                    placeholder={item.placeholder}
                    required={item.required}
                    initialValue={formState[item.name] as string}
                />
            ))}
            <AppButton type="submit" disabled={!validState}>
                {taskToEdit ? 'Guardar' : 'Añadir'}
            </AppButton>
        </form>
    );
}
