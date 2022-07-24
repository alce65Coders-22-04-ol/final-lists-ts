import { iTask } from '../models/task';

export interface iContext {
    tasks: Array<iTask>;
    setTasks: (state: Array<iTask>) => void;
    isLoading: boolean;
    setIsLoading: (state: boolean) => void;
    taskToEdit: iTask | null;
    setTaskToEdit: (state: null | iTask) => void;
}
