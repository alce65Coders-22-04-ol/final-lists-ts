import { IngredientModel } from '../models/ingredient.model';
import { ingredientsReducer } from './ingredients.reducer';
import * as ac from './ingredients.action.creators';

describe('Given Ingredients reducer', () => {
    describe('When it has been instantiate with an initial state', () => {
        let initialState: Array<IngredientModel>;
        let mockIngredient: IngredientModel;
        beforeAll(() => {
            mockIngredient = {
                id: '1',
                name: 'Test Ingredient',
                tags: [],
                country: 'Spain',
            };
            initialState = [];
        });
        test('Then if the action is load', () => {
            // arrange
            const action = ac.loadIngredientsAction([mockIngredient]);
            // act
            const result = ingredientsReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockIngredient]);
        });
        test('Then if the action is add', () => {
            // arrange
            const action = ac.addIngredientsAction(mockIngredient);
            // act
            const result = ingredientsReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockIngredient]);
        });
        test('Then if the action is update', () => {
            // arrange
            initialState = [mockIngredient, { ...mockIngredient, id: '2' }];
            const updateData = {
                id: '1',
                name: 'Update Ingredient',
                tags: [],
                country: 'Spain',
            };
            const action = ac.updateIngredientsAction(updateData);
            // act
            const result = ingredientsReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([
                updateData,
                { ...mockIngredient, id: '2' },
            ]);
        });
        test('Then if the action is delete', () => {
            // arrange
            initialState = [mockIngredient];
            const action = ac.deleteIngredientsAction(mockIngredient.id);
            // act
            const result = ingredientsReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([]);
        });
    });
});
