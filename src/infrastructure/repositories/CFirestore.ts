import {
    collection,
    doc,
    Firestore,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
    getFirestore,
    DocumentData,
    DocumentReference,
    UpdateData,
} from 'firebase/firestore';
import { basicResponse, basicT, iRepository } from '../interfaces/repository';

export class Repository<T extends basicT, R extends basicResponse>
    implements iRepository<T, R>
{
    db: Firestore;

    constructor(public collection: string) {
        this.db = getFirestore();
    }

    async getAllItems(): Promise<Array<T>> {
        const colRef = collection(this.db, this.collection);
        const data: DocumentData = await getDocs(colRef);
        const result: Array<T> = [];
        data.forEach((doc: any) => result.push({ ...doc.data(), id: doc.id }));
        return result;
    }

    async getItem(dataID: T['id']): Promise<T> {
        const docRef = doc(
            this.db,
            this.collection,
            dataID as unknown as string
        );
        return await this.processItemData(docRef, 'Get');
    }

    private processItemData = async (
        docRef: DocumentReference<DocumentData>,
        action: string
    ) => {
        const docSnap = await getDoc(docRef);
        const result = docSnap.exists()
            ? ({ ...docSnap.data(), id: docRef.id } as T)
            : null;
        if (result === null) throw new Error(`${action} item not posible`);
        console.log(`${action} document data:`, result);
        return result;
    };

    // setItem(dataID: string, data: T) {
    //     const target = `${this.collection}/${dataID}`;
    //     const dbRef = ref(this.db, target);
    //     return set(dbRef, data).then(() => data);
    // }

    async addItem(data: T): Promise<T> {
        const colRef = collection(this.db, this.collection);
        const docRef = doc(colRef);
        await setDoc(docRef, data);
        console.log('ID', docRef.id);
        return await this.processItemData(docRef, 'Add');
    }

    async updateItem(data: Partial<T>): Promise<T> {
        const docRef = doc(this.db, this.collection, data.id as string);
        await updateDoc(docRef as DocumentReference<T>, data as UpdateData<T>);
        return this.processItemData(docRef, 'Upddate');
        // return this.getItem(data.id as T['id']);
    }

    async deleteItem(dataID: T['id']): Promise<R> {
        const docRef = doc(this.db, this.collection, dataID as string);
        await deleteDoc(docRef);
        return { ok: true } as R;
    }
}
