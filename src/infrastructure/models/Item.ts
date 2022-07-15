export interface iItem {
    id: string;
    title: string;
    info: string;
    isCompleted: boolean;
}

export interface iItemInput {
    title: string;
    info: string;
    isCompleted: boolean;
}

export class Item implements iItem {
    isCompleted: boolean;
    constructor(public id: string, public title: string, public info: string) {
        this.isCompleted = false;
    }
}
