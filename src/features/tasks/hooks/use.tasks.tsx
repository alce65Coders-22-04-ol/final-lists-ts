import { useContext, useCallback, useMemo } from 'react';
import { TaskContext } from '../context/context';
import { TaskModel, TaskInput } from '../models/task.model';
import { RTFirebaseRepository } from '../../../infrastructure/repositories/RTFirebase.repository';
import { FBResponse } from '../../../infrastructure/interfaces/repository';

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
    const rp = useMemo(
        () => new RTFirebaseRepository<TaskModel, FBResponse>('tasks'),
        []
    );

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

    const addTask = (task: TaskInput) => {
        // Añadir la tarea al repositorio
        rp.addItem(task as TaskModel).then((data) =>
            // Actualizar el estado con la nueva tarea
            setTasks([...tasks, data])
        );
    };

    const updateTask = (
        id: TaskModel['id'],
        partialTask: Partial<TaskModel>
    ) => {
        partialTask.id = id;
        // Modificar la ratea en el repositorio
        rp.updateItem(partialTask).then((data) =>
            // Actualizar el estado con la tarea modificada
            setTasks(tasks.map((item) => (item.id === id ? data : item)))
        );
    };

    const deleteTask = (id: TaskModel['id']) => {
        // Eliminar la tarea del repositorio
        rp.deleteItem(id).then(() => {
            // Actualizar el estado sin la tarea eliminada
            setTasks(tasks.filter((item) => item.id !== id));
        });
    };

    const startToEditTask = (task: TaskModel) => {
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
