import { basicResponse, basicT, Repository } from '../interfaces/repository';

export class HttpFetchRepository<T extends basicT, R extends basicResponse>
    implements Repository<T, R>
{
    constructor(public url: string, public postUrl = '') {}
    getAllItems(): Promise<Array<T>> {
        return fetch(this.url + this.postUrl)
            .then((resp) => resp.json())
            .then((data: { [key: string]: any }) => {
                if (!data) return [];
                if (Array.isArray(data)) return data;
                return Object.keys(data).map((item) => ({
                    ...data[item],
                    id: item,
                }));
            });
    }
    getItem(id: T['id']): Promise<T> {
        return fetch(this.url + '/' + id + this.postUrl)
            .then((resp) => resp.json())
            .then((data) => {
                if (!data || data.id === id) return data;
                return { ...data, id };
            });
    }

    addItem(item: Partial<T>): Promise<T> {
        return fetch(this.url + this.postUrl, {
            method: 'POST',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((resp) => resp.json())
            .then((id) => {
                return { ...item, id: id.name } as T;
            });
    }

    updateItem(item: Partial<T>): Promise<T> {
        return fetch(this.url + '/' + item.id + this.postUrl, {
            method: 'PATCH',
            body: JSON.stringify(item),
            headers: { 'Content-Type': 'application/json' },
        })
            .then((resp) => resp.json())
            .then((data) => this.getItem(data.id));
    }
    deleteItem(id: T['id']): Promise<R> {
        return fetch(this.url + '/' + id + this.postUrl, {
            method: 'DELETE',
        }).then((resp) => resp as unknown as R);
    }
}
