import { getRecipes } from './mock.fetch';

describe('Given the function getRecipes', () => {
    describe('When it is run', () => {
        test('Then the result should be the mocked array with 2 items', async () => {
            const result = await getRecipes();
            expect(result.length).toBe(2);
        });
    });
});
