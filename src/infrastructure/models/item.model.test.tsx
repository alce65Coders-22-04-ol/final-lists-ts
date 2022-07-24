import { ItemModel, Item } from './item.model';

describe('Given Item model', () => {
    describe('When it has been instantiate', () => {
        test('Then it has the properties with the provided values', () => {
            // arrange
            const mockItem: Partial<ItemModel> = {
                id: '1',
                title: 'Test',
                info: 'Test item',
            };
            const expected = { ...mockItem, isCompleted: false };
            // act
            const tuple: [string, string, string] = Object.values(mockItem) as [
                string,
                string,
                string
            ];
            const newItem = new Item(...tuple);
            // assert
            expect({ ...newItem }).toStrictEqual(expected);
            expect(newItem.isCompleted).toBe(false);
        });
    });
});
