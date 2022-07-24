export interface ItemModel {
    id: string;
    title: string;
    info: string;
    isCompleted: boolean;
}

export interface ItemInput {
    title: string;
    info: string;
    isCompleted: boolean;
}

export class Item implements ItemModel {
    isCompleted: boolean;
    constructor(public id: string, public title: string, public info: string) {
        this.isCompleted = false;
    }
}
