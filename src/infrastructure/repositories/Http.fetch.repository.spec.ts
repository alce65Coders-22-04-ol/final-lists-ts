/**
 *
 * Test de integración que no hace mock de la conexión a Firebase
 * Se nombra como spec para que solo se incluya en el script test:all
 *
 */

import { basicResponse } from '../interfaces/repository';
import { Item, ItemInput, ItemModel } from '../models/item.model';
import { HttpFetchRepository } from './Http.fetch.repository';

const url =
    'https://alce65-todo-react-default-rtdb.europe-west1.firebasedatabase.app/items-test';

const deleteAllData = async (
    repo: HttpFetchRepository<ItemModel, basicResponse>
) => {
    const result = await repo.getAllItems();
    result.forEach((item) => repo.deleteItem(item.id));
};

describe('Given Repository', () => {
    describe(`When we instantiate and start a collection 
                using method addItems with two records`, () => {
        let repo: HttpFetchRepository<ItemModel, Response>;
        let mockValues: Array<ItemInput>;
        let firstID: string;
        beforeEach(async () => {
            // arrange
            const mockFullValues = [
                new Item('1', 'Item1', 'Made by Pepe'),
                new Item('2', 'Item2', 'Made by Luisa'),
            ];
            mockValues = mockFullValues.map(({ title, info, isCompleted }) => ({
                title,
                info,
                isCompleted,
            }));
            repo = new HttpFetchRepository(url, '.json');
            await deleteAllData(repo);
            const firstItem = await repo.addItem(mockValues[0]);
            firstID = firstItem.id;
            await repo.addItem(mockValues[1]);
        });

        afterAll(async () => {
            await deleteAllData(new HttpFetchRepository(url, '.json'));
        });

        describe('And we use method getItems', () => {
            test('Then getItems should return a array of two items', async () => {
                // act
                const result = await repo.getAllItems();
                // assert
                firstID = result[0].id;
                expect(result.length).toBe(2);
            });
        });
        describe('And we use method getItem', () => {
            test('Then it should return a item', async () => {
                // act
                const result = await repo.getItem(firstID);
                // assert
                expect(result.title).toBe(mockValues[0].title);
            });
        });

        describe('And we use method addItem', () => {
            test('Then it should return the added item', async () => {
                // arrange
                const item = {
                    title: 'Item Added',
                    info: 'Made by Ernesto',
                    isCompleted: false,
                };
                // act
                const result = await repo.addItem(item);
                // assert
                expect(result.title).toBe(item.title);
            });
        });
        describe('And we use method updateItem', () => {
            test('Then it should return the updated item', async () => {
                // arrange
                const item = { id: firstID, title: 'Item Updated' };
                // act
                const result = await repo.updateItem(item);
                // assert
                expect(result.title).toBe(item.title);
            });
        });
        describe('And we use method deleteItem', () => {
            test('Then it should return a status ok', async () => {
                // arrange
                const item = {
                    title: 'Item Added',
                    info: 'Made by Ernesto',
                    isCompleted: false,
                };
                const added = await repo.addItem(item);
                expect((await repo.getAllItems()).length).toBe(
                    mockValues.length + 1
                );
                // act
                const result = await repo.deleteItem(added.id);
                // assert
                expect(result.status).toBe(200);
                expect((await repo.getAllItems()).length).toBe(
                    mockValues.length
                );
            });
        });
    });
});
