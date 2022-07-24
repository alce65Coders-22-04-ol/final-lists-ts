import {
    collection,
    doc,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc,
} from 'firebase/firestore';
import { FBResponse } from '../interfaces/repository';
import { UserData, UserDataInput } from '../interfaces/user.data';
import { CFirestoreRepository } from './CFirestore.repository';

jest.mock('firebase/firestore');

describe('Given an instance of service CFirestore for "users"', () => {
    let repo: CFirestoreRepository<UserData, FBResponse>;
    let userData1: UserDataInput;
    let userData2: UserDataInput;
    let userData3: UserDataInput;
    let collectionName: string;

    beforeEach(() => {
        // startFirebase());
        collectionName = 'users-test';
        repo = new CFirestoreRepository<UserData, FBResponse>(collectionName);
        userData1 = {
            username: 'Pepe',
            email: 'pepe@sample.com',
            profile_picture: 'test 1',
        };
        userData2 = {
            username: 'Luisa',
            email: 'luisa@sample.com',
            profile_picture: 'test 2',
        };
        userData3 = {
            username: 'Martín',
            email: 'martin@sample.com',
            profile_picture: 'test 2',
        };
        (collection as jest.Mock).mockReturnValue({ type: 'colRef' });
    });

    describe('When data provide are valid', () => {
        test('A document in de DB should be created & read', async () => {
            const id = '1';
            (doc as jest.Mock).mockReturnValue({ type: 'docRef', id });
            (getDoc as jest.Mock).mockReturnValue({
                exists: jest.fn().mockReturnValue(true),
                data: jest.fn().mockReturnValue({ ...userData1, id }),
            });
            let result = await repo.addItem(userData1 as UserData);
            expect(collection).toHaveBeenCalled();
            expect(doc).toHaveBeenCalled();
            expect(setDoc).toHaveBeenCalled();
            expect(getDoc).toHaveBeenCalled();
            expect(result).toStrictEqual({ ...userData1, id });
            result = await repo.getItem(id);
            expect(result).toStrictEqual({ ...userData1, id });
        });

        test('A document in de DB should be created & update', async () => {
            const id = '2';
            (getDoc as jest.Mock).mockReturnValue({
                exists: jest.fn().mockReturnValue(true),
                data: jest.fn().mockReturnValue({ ...userData2, id }),
            });
            (doc as jest.Mock).mockReturnValue({ type: 'docRef', id });

            let result = await repo.addItem(userData2 as UserData);
            expect(collection).toHaveBeenCalled();
            expect(setDoc).toHaveBeenCalled();
            expect(getDoc).toHaveBeenCalled();
            expect(result).toStrictEqual({ ...userData2, id: result.id });

            (getDoc as jest.Mock).mockReturnValue({
                exists: jest.fn().mockReturnValue(true),
                data: jest
                    .fn()
                    .mockReturnValue({ ...userData2, id, username: 'Ernesto' }),
            });

            result = await repo.updateItem({
                id: result.id,
                username: 'Ernesto',
            });
            expect(doc).toHaveBeenCalled();
            expect(updateDoc).toHaveBeenCalled();
            expect(result).toStrictEqual({
                ...userData2,
                id: result.id,
                username: 'Ernesto',
            });
        });

        test('A document in de DB should be deleted', async () => {
            //const result = await repo.addItem(userData3 as iUserData);
            //expect(result).toStrictEqual({ ...userData3, id: result.id });
            const id = '2';
            const deletedResult = await repo.deleteItem(id);
            expect(doc).toHaveBeenCalled();
            expect(deleteDoc).toHaveBeenCalled();
            expect(deletedResult.ok).toBe(true);
            //     } catch (error) {
            //         // eslint-disable-next-line jest/no-conditional-expect
            //         expect(error).toBe(/No data/i);
            //     }
        });

        test('Several documents in de DB should be read', async () => {
            // const colRef = collection(dbApp, collectionName);
            // await setDoc(doc(colRef), userData1);
            (getDocs as jest.Mock).mockReturnValue([
                {
                    data: jest.fn().mockReturnValue({
                        ...userData2,
                        id: 2,
                    }),
                },
            ]);
            const result = await repo.getAllItems();
            expect(collection).toHaveBeenCalled();
            expect(getDocs).toHaveBeenCalled();
            expect((result as unknown as Array<any>).length).toBe(1);
        });
    });

    describe('When data provide are not valid', () => {
        test('if id is not valid a document in de DB should not be read', async () => {
            (getDoc as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(null),
            });
            const id = 'no-valid';
            try {
                await repo.getItem(id);
                expect(doc).toHaveBeenCalled();
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect((error as Error).message).toBe('Get item not posible');
            }
        });
    });
});
