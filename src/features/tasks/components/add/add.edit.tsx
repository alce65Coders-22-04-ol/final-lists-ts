import { SyntheticEvent, useRef, useState, useEffect } from 'react';
import { TaskModel, TaskInput } from '../../models/task.model';
import { useTasks } from '../../hooks/use.tasks';
import AppInput from '../../../../infrastructure/components/ui/input/app.input';
import { AppButton } from '../../../../infrastructure/components/ui/button/app.button';

export function AddOrEdit() {
    const { addTask, updateTask, getContext } = useTasks();
    const { taskToEdit } = getContext();

    const initialState: TaskInput = {
        title: '',
        responsible: '',
        isCompleted: false,
    };

    const [formState, setFormState] = useState(initialState);

    useEffect(() => {
        if (taskToEdit) {
            const updateState: TaskModel = {
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
        const formData: TaskInput = {
            title: formState.title,
            responsible: formState.responsible,
            isCompleted: false,
        };
        addTask(formData);
        setFormState(initialState);
        setValidState(false);
    };

    const makeUpdateTask = (task: TaskModel) => {
        const formData: TaskInput = {
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
