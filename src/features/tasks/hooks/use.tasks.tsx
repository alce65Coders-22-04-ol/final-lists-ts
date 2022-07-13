import { useContext, useCallback, useMemo } from 'react';
import { TaskContext } from '../context/context';
import { iTask, iTaskInput } from '../models/task';
import { Repository } from '../../../infrastructure/repositories/RTFirebase';
import { iFBResponse } from '../../../infrastructure/interfaces/repository';

export function useTasks() {
    // Traer del contexto los valores del estado: tareas, isLoading y sus setters
    const {
        tasks,
        isLoading,
        setTasks,
        setIsLoading,
        taskToEdit,
        setTaskToEdit,
    } = useContext(TaskContext);
    const rp = useMemo(() => new Repository<iTask, iFBResponse>('tasks'), []);

    const getContext = () => {
        return { tasks, taskToEdit, isLoading };
    };

    const loadTasks = useCallback(() => {
        // Cargar las tareas del repositorio
        setIsLoading(true);
        rp.getAllItems().then((data) => {
            // Actualizar con ellas el estado
            setTasks(data);
            setIsLoading(false);
        });
    }, [rp, setTasks, setIsLoading]);

    const addTask = (task: iTaskInput) => {
        // Añadir la tarea al repositorio
        rp.addItem(task as iTask).then((data) =>
            // Actualizar el estado con la nueva tarea
            setTasks([...tasks, data])
        );
    };

    const updateTask = (id: iTask['id'], partialTask: Partial<iTask>) => {
        partialTask.id = id;
        // Modificar la ratea en el repositorio
        rp.updateItem(partialTask).then((data) =>
            // Actualizar el estado con la tarea modificada
            setTasks(tasks.map((item) => (item.id === id ? data : item)))
        );
    };

    const deleteTask = (id: iTask['id']) => {
        // Eliminar la tarea del repositorio
        rp.deleteItem(id).then(() => {
            // Actualizar el estado sin la tarea eliminada
            setTasks(tasks.filter((item) => item.id !== id));
        });
    };

    const startToEditTask = (task: iTask) => {
        setTaskToEdit(task);
    };

    return {
        getContext,
        loadTasks,
        addTask,
        updateTask,
        deleteTask,
        startToEditTask,
    };
}
