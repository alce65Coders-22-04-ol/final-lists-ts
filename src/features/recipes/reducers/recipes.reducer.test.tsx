import { recipesReducer } from './recipes.reducer';
import * as ac from './recipes.action.creators';
import { RecipeModel } from '../models/recipe.model';

describe('Given Recipes reducer', () => {
    describe('When it has been instantiate with an initial state', () => {
        let initialState: Array<RecipeModel>;
        let mockRecipe: RecipeModel;
        beforeAll(() => {
            mockRecipe = { id: '1', name: 'Test Recipe', ingredients: [] };
            initialState = [];
        });
        test('Then if the action is load', () => {
            // arrange
            const action = ac.loadRecipesAction([mockRecipe]);
            // act
            const result = recipesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockRecipe]);
        });
        test('Then if the action is add', () => {
            // arrange
            const action = ac.addRecipesAction(mockRecipe);
            // act
            const result = recipesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([mockRecipe]);
        });
        test('Then if the action is update', () => {
            // arrange
            initialState = [mockRecipe, { ...mockRecipe, id: '2' }];
            const updateData = {
                id: '1',
                name: 'Update Recipe',
                ingredients: [],
            };
            const action = ac.updateRecipesAction(updateData);
            // act
            const result = recipesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([
                updateData,
                { ...mockRecipe, id: '2' },
            ]);
        });
        test('Then if the action is delete', () => {
            // arrange
            initialState = [mockRecipe];
            const action = ac.deleteRecipesAction(mockRecipe.id);
            // act
            const result = recipesReducer(initialState, action);
            // assert
            expect(result).toStrictEqual([]);
        });
    });
});
