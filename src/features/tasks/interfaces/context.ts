import { iTask } from '../models/task';

export interface iContext {
    tasks: Array<iTask>;
    setTasks: Function;
    isLoading: boolean;
    setIsLoading: Function;
}
