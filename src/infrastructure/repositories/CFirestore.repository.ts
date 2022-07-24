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
import { basicResponse, basicT, Repository } from '../interfaces/repository';

export class CFirestoreRepository<T extends basicT, R extends basicResponse>
    implements Repository<T, R>
{
    db: Firestore;

    constructor(public collectionName: string) {
        this.db = getFirestore();
    }

    async getAllItems(): Promise<Array<T>> {
        const colRef = collection(this.db, this.collectionName);
        const data: DocumentData = await getDocs(colRef);
        const result: Array<T> = [];
        data.forEach((docItem: any) =>
            result.push({ ...docItem.data(), id: docItem.id })
        );
        return result;
    }

    async getItem(dataID: T['id']): Promise<T> {
        const docRef = doc(
            this.db,
            this.collectionName,
            dataID as unknown as string
        );
        return this.processItemData(docRef, 'Get');
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

    async addItem(data: T): Promise<T> {
        const colRef = collection(this.db, this.collectionName);
        const docRef = doc(colRef);
        await setDoc(docRef, data);
        console.log('ID', docRef.id);
        return this.processItemData(docRef, 'Add');
    }

    async updateItem(data: Partial<T>): Promise<T> {
        const docRef = doc(this.db, this.collectionName, data.id as string);
        await updateDoc(docRef as DocumentReference<T>, data as UpdateData<T>);
        return this.processItemData(docRef, 'Upddate');
    }

    async deleteItem(dataID: T['id']): Promise<R> {
        const docRef = doc(this.db, this.collectionName, dataID as string);
        await deleteDoc(docRef);
        return { ok: true } as R;
    }
}
