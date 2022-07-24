/**
 * @jest-environment node
 *
 * Test de integración que no hace mock de la conexión a Firebase
 * Se nombra como spec para que solo se incluya en el script test:all
 *
 */

import { FBResponse } from '../interfaces/repository';
import { UserData, UserDataInput } from '../interfaces/user.data';
import { startFirebase } from '../services/firebase';
import { CFirestoreRepository } from './CFirestore.repository';

describe(`Given an instance of repository service CFirestore for "users" 
        really connected to Cloud Firestore`, () => {
    let repo: CFirestoreRepository<UserData, FBResponse>;
    let userData1: UserDataInput;
    let userData2: UserDataInput;
    let userData3: UserDataInput;
    let collectionName: string;

    beforeEach(() => {
        startFirebase();
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
    });

    afterAll(async () => {
        console.log('After All');
        const items = await repo.getAllItems();
        items.forEach(async (item) => repo.deleteItem(item.id));
    });

    describe('When data provide are valid', () => {
        test('A document in de DB should be created & read', async () => {
            let result = await repo.addItem(userData1 as UserData);
            const id = result.id;
            expect(result).toStrictEqual({ ...userData1, id });
            result = await repo.getItem(id);
            expect(result).toStrictEqual({ ...userData1, id });
        });

        test('A document in de DB should be created & update', async () => {
            let result = await repo.addItem(userData2 as UserData);
            expect(result).toStrictEqual({ ...userData2, id: result.id });
            result = await repo.updateItem({
                id: result.id,
                username: 'Ernesto',
            });
            expect(result).toStrictEqual({
                ...userData2,
                id: result.id,
                username: 'Ernesto',
            });
        });

        test('A document in de DB should be created & deleted', async () => {
            const result = await repo.addItem(userData3 as UserData);
            expect(result).toStrictEqual({ ...userData3, id: result.id });
            const deletedResult = await repo.deleteItem(result.id);
            expect(deletedResult.ok).toBe(true);
        });

        test('Several documents in de DB should be read', async () => {
            const result = await repo.getAllItems();
            console.log({ result });
            expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        });
    });

    describe('When data provide are not valid', () => {
        test('if id is not valid a document in de DB should not be read', async () => {
            const id = 'no-valid';
            try {
                await repo.getItem(id);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                // No funciona (sin explicación)
                // expect(error as Error).toBe(/Get item not posible/i);
                // eslint-disable-next-line jest/no-conditional-expect
                expect((error as Error).message).toBe('Get item not posible');
            }
        });
    });
});
