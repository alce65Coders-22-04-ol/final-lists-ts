import { basicResponse, basicT, iRepository } from '../interfaces/repository';
// import { iItem } from '../models/item';

export class Repository<T extends basicT, R extends basicResponse>
    implements iRepository<T, R>
{
    url: string;
    constructor() {
        this.url = 'http://localhost:3545/items/';
    }
    getAllItems(): Promise<Array<T>> {
        return fetch(this.url).then((resp) => resp.json());
    }
    getItem(id: T['id']): Promise<T> {
        return fetch((this.url + id) as string).then((resp) => resp.json());
    }

    addItem(item: Partial<T>): Promise<T> {
        return fetch(this.url, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' },
        }).then((resp) => resp.json());
    }
    updateItem(item: Partial<T>): Promise<T> {
        return fetch(this.url + item.id, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' },
        }).then((resp) => resp.json());
    }
    deleteItem(id: T['id']): Promise<R> {
        return fetch(this.url + id, {
            method: 'DELETE',
        }).then((resp) => resp as unknown as R);
    }
}
