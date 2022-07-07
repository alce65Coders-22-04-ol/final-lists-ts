import { iTask } from '../../features/tasks/models/task';
import { startFirebase } from './firebase';
import { iUserData, Repository } from './repository';

describe('Given an instance of service Repository for "users"', () => {
    let repo: Repository<iUserData>;
    let userData: iUserData;
    let userID: string;
    let collection: string;

    beforeEach(() => {
        startFirebase();
        collection = 'users';
        repo = new Repository<iUserData>(collection);
        userData = {
            username: 'Pepe',
            email: 'pepe@sample.com',
            profile_picture: 'test',
        };
        userID = '1';
    });

    describe('When userId and userData provide are valid', () => {
        test('A document in de DB should be created & read', async () => {
            await repo.setData(userID, userData);
            const result = await repo.getData(userID);
            expect((result as unknown as iUserData).username).toBe('Pepe');
        });
        test('A document in de DB should be created & update', async () => {
            userID = '2';
            await repo.setData(userID, userData);
            let result = await repo.getData(userID);
            expect((result as unknown as iUserData).username).toBe('Pepe');
            await repo.updateData(userID, { username: 'Luisa' });
            result = await repo.getData(userID);
            expect((result as unknown as iUserData).username).toBe('Luisa');
        });
        test('A document in de DB should be created & deleted', async () => {
            userID = '3';
            await repo.setData(userID, userData);
            let result = await repo.getData(userID);
            expect((result as unknown as iUserData).username).toBe('Pepe');
            await repo.deleteData(userID);
            try {
                await repo.getData(userID);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBe(/No data/i);
            }
        });
        test('Several documents in de DB should be read', async () => {
            // await repo.setData(userData, userID);
            const result = await repo.getAllData();
            console.log({ result }, Array.isArray(result));
            expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        });
    });

    describe('When userId provide are not valid', () => {
        test('Then an error is throw as result', async () => {
            userID = '22';
            try {
                await repo.getData(userID);
            } catch (error) {
                // eslint-disable-next-line jest/no-conditional-expect
                expect(error).toBe(/No data/i);
            }
        });
    });
});

describe('Given an instance of service Repository for "tasks"', () => {
    let repo: Repository<iTask>;
    let taskData: iTask;
    let collection: string;

    beforeEach(() => {
        startFirebase();
        collection = 'tasks';
        repo = new Repository<iTask>(collection);
        taskData = {
            name: 'Test task',
            responsible: 'Pepe',
            isCompleted: true,
        };
    });
    test('A document in de DB should be created & read', async () => {
        await repo.setListData(taskData);
        await repo.setListData({
            ...taskData,
            name: 'Otra task',
            responsible: 'Luisa',
        });
        const result = await repo.getAllData();
        console.log({ result });
        expect((result as unknown as Array<any>).length).toBeGreaterThan(1);
        expect((result as unknown as Array<any>)[0].responsible).toBe('Pepe');
    });
});
