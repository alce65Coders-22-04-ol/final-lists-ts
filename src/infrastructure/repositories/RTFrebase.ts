import {
    Database,
    getDatabase,
    ref,
    set,
    get,
    push,
    child,
    DatabaseReference,
    update,
} from 'firebase/database';

export class Repository<T> {
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
                console.log((error as Error).message);
            });
    };

    getAllData(): Promise<Array<T>> {
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

    getData(dataID: string): Promise<T> {
        const dbRef = ref(this.db);
        const target = `${this.collection}/${dataID}`;
        const query = child(dbRef, target);
        return this.processQuery(query) as Promise<T>;
    }

    setData(dataID: string, data: T) {
        const target = `${this.collection}/${dataID}`;
        const dbRef = ref(this.db, target);
        return set(dbRef, data).then(() => data);
    }

    setListData(data: T) {
        const listRef = ref(this.db, this.collection);
        const newItemRef = push(listRef);
        return set(newItemRef, data).then(() => data);
    }

    updateData(dataID: string, data: Partial<T>) {
        const target = `${this.collection}/${dataID}`;
        const dbRef = ref(this.db, target);
        return update(dbRef, data).then(() => data);
    }

    deleteData(dataID: string) {
        const target = `${this.collection}/${dataID}`;
        const dbRef = ref(this.db, target);
        return set(dbRef, null).then(() => ({}));
    }
}
