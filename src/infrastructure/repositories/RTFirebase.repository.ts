import {
    Database,
    getDatabase,
    DatabaseReference,
    child,
    ref,
    set,
    get,
    push,
    update,
} from 'firebase/database';
import { basicResponse, basicT, Repository } from '../interfaces/repository';

export class RTFirebaseRepository<T extends basicT, R extends basicResponse>
    implements Repository<T, R>
{
    db: Database;

    constructor(public collection: string) {
        this.db = getDatabase();
    }

    private processQuery = (
        query: DatabaseReference
    ): Promise<T | Array<T>> => {
        return get(query)
            .then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    throw new Error('No data available');
                }
            })
            .catch((error) => {
                console.error((error as Error).message);
            });
    };

    getAllItems(): Promise<Array<T>> {
        const dbRef = ref(this.db);
        const query = child(dbRef, this.collection);
        const result = this.processQuery(query).then(
            (data: { [key: string]: any }) => {
                if (!data || Array.isArray(data)) return data;
                return Object.keys(data).map((item) => ({
                    ...data[item],
                    id: item,
                }));
            }
        );
        return result as Promise<Array<T>>;
    }

    getItem(dataID: T['id']): Promise<T> {
        const dbRef = ref(this.db);
        const target = `${this.collection}/${dataID}`;
        const query = child(dbRef, target);
        return this.processQuery(query) as Promise<T>;
    }

    setItem(dataID: string, data: T) {
        const target = `${this.collection}/${dataID}`;
        const dbRef = ref(this.db, target);
        return set(dbRef, data).then(() => data);
    }

    addItem(data: T): Promise<T> {
        const listRef = ref(this.db, this.collection);
        const newItemRef = push(listRef);
        return set(newItemRef, data).then(() => ({
            ...data,
            id: newItemRef.key,
        }));
    }

    updateItem(data: Partial<T>): Promise<T> {
        const target = `${this.collection}/${data.id as T['id']}`;
        const dbRef = ref(this.db, target);
        return update(dbRef, data).then(() =>
            this.getItem(dbRef.key as string)
        );
    }

    deleteItem(dataID: T['id']): Promise<R> {
        const target = `${this.collection}/${dataID as string}`;
        const dbRef = ref(this.db, target);
        return set(dbRef, null).then(
            () =>
                ({
                    ok: true,
                } as R)
        );
    }
}
