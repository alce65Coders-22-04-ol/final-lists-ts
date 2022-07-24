export interface TaskModel {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
}

export interface TaskInput {
    title: string;
    responsible: string;
    isCompleted: boolean;
}
