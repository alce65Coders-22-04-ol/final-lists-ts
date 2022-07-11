export interface iTask {
    id: string;
    title: string;
    responsible: string;
    isCompleted: boolean;
}

export interface iTaskInput {
    title: string;
    responsible: string;
    isCompleted: boolean;
}
