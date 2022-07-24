import { Item, ItemModel } from '../models/item.model';
import { HttpFetchRepository } from './Http.fetch.repository';

//import axios from "axios";
//jest.mock("axios")

describe('Given Repository', () => {
    describe('When we instantiate', () => {
        describe('And we use method getItems', () => {
            test('Then it should return a array of two items', async () => {
                // arrange
                global.fetch = jest.fn().mockResolvedValue({
                    json: jest
                        .fn()
                        .mockResolvedValue([
                            new Item('1', 'Item1', 'Made by Pepe'),
                            new Item('2', 'Item2', 'Made by Luisa'),
                        ]),
                });
                // act
                const result = await new HttpFetchRepository<
                    ItemModel,
                    Response
                >().getAllItems();
                //
                // assert
                expect(fetch).toBeCalled();
                expect(result.length).toBe(2);
            });
        });
        describe('And we use method getItem', () => {
            test('Then it should return a item', async () => {
                // arrange
                const itemId = '1';
                global.fetch = jest.fn().mockResolvedValue({
                    json: jest
                        .fn()
                        .mockResolvedValue(
                            new Item('12', 'Item1', 'Made by Pepe')
                        ),
                });
                // act
                const result = await new HttpFetchRepository<
                    ItemModel,
                    Response
                >().getItem(itemId);
                // assert
                expect(fetch).toBeCalled();
                expect(result.title).toBe('Item1');
            });
        });

        describe('And we use method addItem', () => {
            test('Then it should return the added item', async () => {
                // arrange
                const item = {
                    title: 'Item1',
                    info: 'Made by Pepe',
                    isCompleted: false,
                };
                global.fetch = jest.fn().mockResolvedValue({
                    json: jest
                        .fn()
                        .mockResolvedValue(new Item('3', 'Item1', 'Pepe')),
                });
                // act
                const result = await new HttpFetchRepository<
                    ItemModel,
                    Response
                >().addItem(item);
                // assert
                expect(fetch).toBeCalled();
                expect(result.title).toBe('Item1');
            });
        });
        describe('And we use method updateItem', () => {
            test('Then it should return the updated item', async () => {
                // arrange
                const item = { title: 'Item1', info: 'Made by Pepe' };
                global.fetch = jest.fn().mockResolvedValue({
                    json: jest
                        .fn()
                        .mockResolvedValue(
                            new Item('4', 'Item1', 'Made by Pepe')
                        ),
                });
                // act
                const result = await new HttpFetchRepository<
                    ItemModel,
                    Response
                >().updateItem(item);
                // assert
                expect(fetch).toBeCalled();
                expect(result.title).toBe('Item1');
            });
        });
        describe('And we use method deleteItem', () => {
            test('Then it should return a status ok', async () => {
                // arrange
                const deleteId = '1';
                global.fetch = jest.fn().mockResolvedValue({
                    status: 200,
                });
                // act
                const result = await new HttpFetchRepository<
                    ItemModel,
                    Response
                >().deleteItem(deleteId);
                expect(fetch).toBeCalled();
                expect(result.status).toBe(200);
            });
        });
    });
});
