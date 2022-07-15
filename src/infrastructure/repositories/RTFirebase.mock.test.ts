import { iTask } from '../../features/tasks/models/task';
import { iFBResponse } from '../interfaces/repository';
import { iUserData } from '../interfaces/user.data';
import { Repository } from './RTFirebase';
import { ref, child, set, get, push, update } from 'firebase/database';

jest.mock('firebase/database');

describe('Given an instance of service RTFirebase for "users"', () => {
    let repo: Repository<iUserData, iFBResponse>;
    let userData: iUserData;
    let userID: string;
    let collection: string;

    beforeEach(() => {
        // startFirebase();
        (ref as jest.Mock).mockReturnValue({ type: 'dbRef' });
        (set as jest.Mock).mockResolvedValue({ type: 'T' });
        (child as jest.Mock).mockReturnValue({ type: 'child/query' });
        collection = 'users-test';
        repo = new Repository<iUserData, iFBResponse>(collection);
    });

    describe('When userId and userData provide are valid', () => {
        test('A document in de DB should be created & read', async () => {
            userData = {
                id: '1',
                username: 'Pepe',
                email: 'pepe@sample.com',
                profile_picture: 'test',
            };
            (get as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(true),
                val: jest.fn().mockReturnValue(userData),
            }); // snapshot
            await repo.setItem(userData.id, userData);
            expect(ref).toHaveBeenCalled();
            expect(set).toHaveBeenCalled();
            const result = await repo.getItem(userData.id);
            expect(get).toHaveBeenCalled();
            expect(result).toStrictEqual(userData);
            // });
        });
        test('A document in de DB should be created & update', async () => {
            userData = {
                id: '2',
                username: 'Luisa',
                email: 'luisa@sample.com',
                profile_picture: 'test',
            };
            (get as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(true),
                val: jest.fn().mockReturnValue(userData),
            });
            (update as jest.Mock).mockResolvedValue({
                ...userData,
            });

            await repo.setItem(userData.id, userData);
            expect(ref).toHaveBeenCalled();
            expect(set).toHaveBeenCalled();

            const result = await repo.updateItem({
                id: userID,
                username: 'Luisa',
            });
            expect(get).toHaveBeenCalled();
            expect(result).toStrictEqual({ ...userData, username: 'Luisa' });
        });
        test('A document in de DB should be created & deleted', async () => {
            userData = {
                id: '3',
                username: 'Martin',
                email: 'martin@sample.com',
                profile_picture: 'test',
            };
            (get as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(false),
                val: jest.fn().mockReturnValue(userData),
            });

            await repo.setItem(userData.id, userData);
            expect(ref).toHaveBeenCalled();
            expect(set).toHaveBeenCalled();

            await repo.deleteItem(userID);
            expect(set).toHaveBeenCalled();
            try {
                await repo.getItem(userID);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBe(/No data/i);
            }
        });
        test('Several documents in de DB should be read', async () => {
            // await repo.setItem(userData, userID);
            (get as jest.Mock).mockResolvedValue({
                exists: jest.fn().mockReturnValue(true),
                val: jest.fn().mockReturnValue([userData, userData]),
            });
            const result = await repo.getAllItems();
            expect(ref).toHaveBeenCalled();
            expect(child).toHaveBeenCalled();
            expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        });
    });

    describe('When userId provide are not valid', () => {
        test('Then an error is throw as result', async () => {
            (get as jest.Mock).mockRejectedValue(new Error('No valid ID'));
            userID = '22';
            try {
                await repo.getItem(userID);
                expect(ref).toHaveBeenCalled();
                expect(child).toHaveBeenCalled();
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBe(/No valid/i);
            }
        });
    });
});

describe('Given an instance of service Repository for "tasks"', () => {
    let repo: Repository<iTask, iFBResponse>;
    let taskData: iTask;
    let taskData2: iTask;
    let collection: string;

    beforeEach(() => {
        taskData = {
            id: '1',
            title: 'Test task',
            responsible: 'Pepe',
            isCompleted: true,
        };
        taskData2 = {
            id: '2',
            title: 'Otra task',
            responsible: 'Luisa',
            isCompleted: true,
        };
        // startFirebase();
        (ref as jest.Mock).mockReturnValue({ type: 'dbRef' });
        (set as jest.Mock).mockResolvedValue({ type: 'T' });
        (push as jest.Mock).mockResolvedValue({ type: 'T' });
        (child as jest.Mock).mockReturnValue({ type: 'child/query' });
        (get as jest.Mock).mockResolvedValue({
            exists: jest.fn().mockReturnValue(true),
            val: jest.fn().mockReturnValue([taskData, taskData2]),
        });
        collection = 'tasks-test';
        repo = new Repository<iTask, iFBResponse>(collection);
    });
    test('A document in de DB should be created & read', async () => {
        await repo.addItem(taskData);
        await repo.addItem(taskData2);
        expect(ref).toHaveBeenCalled();
        expect(push).toHaveBeenCalled();
        const result = await repo.getAllItems();
        expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        console.log({ result });
        expect((result as unknown as Array<any>)[0].responsible).toBe('Pepe');
    });
    test('A document in de DB should be deleted', async () => {
        await repo.addItem(taskData);
        await repo.addItem(taskData2);
        expect(ref).toHaveBeenCalled();
        expect(push).toHaveBeenCalled();
        const data = await repo.getAllItems();

        data.forEach(async (item: iTask, index: number) => {
            if (index > 1) await repo.deleteItem(item.id);
        });
        expect(set).toHaveBeenCalled();
        const result = await repo.getAllItems();
        expect((result as unknown as Array<any>).length).toBeLessThan(3);
    });
});
