/**
 *
 * Test de integración que no hace mock de la conexión a Firebase
 * Se nombra como spec para que solo se incluya en el script test:all
 *
 */

import { TaskModel } from '../../features/tasks/models/task.model';
import { FBResponse } from '../interfaces/repository';
import { UserData } from '../interfaces/user.data';
import { startFirebase } from '../services/firebase';
import { RTFirebaseRepository } from './RTFirebase.repository';

describe(`Given an instance of repository service RTFirebase for "users" 
            really connected to Real Time Firebase`, () => {
    let repo: RTFirebaseRepository<UserData, FBResponse>;
    let userData: UserData;
    let userID: string;
    let collection: string;

    beforeEach(() => {
        startFirebase();
        collection = 'users-test';
        repo = new RTFirebaseRepository<UserData, FBResponse>(collection);
        userData = {
            id: '1',
            username: 'Pepe',
            email: 'pepe@sample.com',
            profile_picture: 'test',
        };
        userID = '1';
    });

    describe('When userId and userData provide are valid', () => {
        test('A document in de DB should be created & read', async () => {
            await repo.setItem(userID, userData);
            const result = await repo.getItem(userID);
            expect(result).toStrictEqual(userData);
        });
        test('A document in de DB should be created & update', async () => {
            userData.id = '2';
            await repo.setItem(userID, userData);
            let result = await repo.getItem(userID);
            expect(result).toStrictEqual(userData);
            result = await repo.updateItem({
                id: userData.id,
                username: 'Luisa',
            });
            expect(result).toStrictEqual({ ...userData, username: 'Luisa' });
        });
        test('A document in de DB should be created & deleted', async () => {
            userID = '3';
            await repo.setItem(userID, userData);
            let result = await repo.getItem(userID);
            expect((result as unknown as UserData).username).toBe('Pepe');
            await repo.deleteItem(userID);
            try {
                await repo.getItem(userID);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBe(/No data/i);
            }
        });
        test('Several documents in de DB should be read', async () => {
            const result = await repo.getAllItems();
            expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        });
    });

    describe('When userId provide are not valid', () => {
        test('Then an error is throw as result', async () => {
            userID = '22';
            try {
                await repo.getItem(userID);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBe(/No data/i);
            }
        });
    });
});

describe(`Given an instance of service Repository for "tasks" 
            really connected to Real Time Firebase`, () => {
    let repo: RTFirebaseRepository<TaskModel, FBResponse>;
    let taskData: TaskModel;
    let taskData2: TaskModel;
    let collection: string;

    beforeEach(() => {
        startFirebase();
        collection = 'tasks-test';
        repo = new RTFirebaseRepository<TaskModel, FBResponse>(collection);
        taskData = {
            id: '1',
            title: 'Test task',
            responsible: 'Pepe',
            isCompleted: true,
        };
        taskData2 = {
            id: '1',
            title: 'Otra task',
            responsible: 'Luisa',
            isCompleted: true,
        };
    });
    test('A document in de DB should be created & read', async () => {
        await repo.addItem(taskData);
        await repo.addItem(taskData2);
        const result = await repo.getAllItems();
        expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        expect((result as unknown as Array<any>)[0].responsible).toBe('Pepe');
    });
    test('A document in de DB should be deleted', async () => {
        await repo.addItem(taskData);
        await repo.addItem(taskData2);
        const data = await repo.getAllItems();

        data.forEach(async (item: TaskModel, index: number) => {
            if (index > 1) await repo.deleteItem(item.id);
        });
        const result = await repo.getAllItems();
        expect((result as unknown as Array<any>).length).toBeLessThan(3);
    });
});
