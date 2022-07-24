import { TaskModel } from '../models/task.model';

export interface Context {
    tasks: Array<TaskModel>;
    setTasks: (state: Array<TaskModel>) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    taskToEdit: TaskModel | null;
    setTaskToEdit: (state: null | TaskModel) => void;
}
