import { configureStore } from '@reduxjs/toolkit';
import { iRecipes } from '../../features/recipes/models/recipes';
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

export interface iState {
    recipes: Array<iRecipes>;
}
