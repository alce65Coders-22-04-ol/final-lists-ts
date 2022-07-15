/**
 * @jest-environment node
 */

import { iFBResponse } from '../interfaces/repository';
import { iUserData, iUserDataInput } from '../interfaces/user.data';
import { startFirebase } from '../services/firebase';
import { Repository } from './CFirestore';

describe('Given an instance of service RTFirebase for "users"', () => {
    let repo: Repository<iUserData, iFBResponse>;
    let userData1: iUserDataInput;
    let userData2: iUserDataInput;
    let userData3: iUserDataInput;
    let collectionName: string;

    beforeEach(() => {
        startFirebase();
        collectionName = 'users-test';
        repo = new Repository<iUserData, iFBResponse>(collectionName);
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
        items.forEach(async (item) => await repo.deleteItem(item.id));
    });

    describe('When data provide are valid', () => {
        test('A document in de DB should be created & read', async () => {
            let result = await repo.addItem(userData1 as iUserData);
            const id = result.id;
            expect(result).toStrictEqual({ ...userData1, id });
            result = await repo.getItem(id);
            expect(result).toStrictEqual({ ...userData1, id });
        });

        test('A document in de DB should be created & update', async () => {
            let result = await repo.addItem(userData2 as iUserData);
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
            const result = await repo.addItem(userData3 as iUserData);
            expect(result).toStrictEqual({ ...userData3, id: result.id });
            //     userID = '3
            //     await repo.setItem(userID, userData);
            //     let result = await repo.getItem(userID);
            //     expect((result as unknown as iUserData).username).toBe('Pepe');
            const deletedResult = await repo.deleteItem(result.id);
            //     try {
            //     await repo.getItem(userID);
            expect(deletedResult.ok).toBe(true);
            //     } catch (error) {
            //         // eslint-disable-next-line jest/no-conditional-expect
            //         expect(error).toBe(/No data/i);
            //     }
        });

        test('Several documents in de DB should be read', async () => {
            // const colRef = collection(dbApp, collectionName);
            // await setDoc(doc(colRef), userData1);
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
                //expect(error as Error).toBe(/Get item not posible/i);
                // eslint-disable-next-line jest/no-conditional-expect
                expect((error as Error).message).toBe('Get item not posible');
            }
        });
    });
});
