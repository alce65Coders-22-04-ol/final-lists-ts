import { configureStore } from '@reduxjs/toolkit';
import { ingredientsReducer } from '../../features/recipes/reducers/ingredients.reducer';
import { recipesReducer } from '../../features/recipes/reducers/recipes.reducer';

export const appStore = configureStore({
    reducer: {
        recipes: recipesReducer,
        ingredients: ingredientsReducer,
    },
});

export type rootStore = typeof appStore;

export type rootState = ReturnType<typeof appStore.getState>;

/**
 * Como alternativa al tipo rootState se podría crear un interface
 * export interface iState {
 *     recipes: Array<RecipeModel>;
 *     ingredients: Array<IngredientModel>
 * }
 *
 *  En este caso no se actualizaría automáticamente al cambiar el Store
 *
 */
