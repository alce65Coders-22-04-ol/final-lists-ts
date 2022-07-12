import { useContext, useCallback, useMemo } from 'react';
import { TaskContext } from '../context/context';
import { iTask, iTaskInput } from '../models/task';
import { Repository } from '../../../infrastructure/repositories/RTFrebase';

export function useTasks() {
    // Traer del contexto los valores del estado: tareas, isLoading y sus seteadores

    const { tasks, isLoading, setTasks, setIsLoading } =
        useContext(TaskContext);
    const rp = useMemo(() => new Repository<iTask>('tasks'), []);

    const getContext = () => {
        return { tasks, isLoading };
    };

    const loadTasks = useCallback(() => {
        // Cargar las tareas del repositorio
        setIsLoading(true);
        rp.getAllData().then((data) => {
            // Actualizar con ellas el estado
            setTasks(data);
            setIsLoading(false);
        });
    }, [rp, setTasks, setIsLoading]);

    const addTask = (task: iTaskInput) => {
        // Añadir la tarea al repositorio
        rp.setListData(task as iTask).then((data) =>
            // Actualizar el estado con la nueva tarea
            setTasks([...tasks, data])
        );
    };

    const completeTask = (id: iTask['id'], partialTask: Partial<iTask>) => {
        // Modificar la ratea en el repositorio
        console.log({ id, partialTask });
        rp.updateData(id, partialTask).then((data) =>
            setTasks(tasks.map((item) => (item.id === id ? data : item)))
        );
        // Actualizar el estado con la tarea modificada
    };

    const deleteTask = (id: iTask['id']) => {
        // Eliminar la tarea del repositorio
        rp.deleteData(id).then(() => {
            setTasks(tasks.filter((item) => item.id !== id));
        });
        // Actualizar el estado sin la tarea eliminada
    };

    return {
        getContext,
        loadTasks,
        addTask,
        completeTask,
        deleteTask,
    };
}
