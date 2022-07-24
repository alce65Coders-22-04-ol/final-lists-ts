import { actionTypes } from './recipes.action.types';
import { createAction } from '@reduxjs/toolkit';
import { RecipeModel } from '../models/recipe.model';

export const loadRecipesAction = createAction<Array<RecipeModel>>(
    actionTypes['recipes@load']
);

export const addRecipesAction = createAction<RecipeModel>(
    actionTypes['recipes@add']
);

export const updateRecipesAction = createAction<RecipeModel>(
    actionTypes['recipes@update']
);

export const deleteRecipesAction = createAction<string>(
    actionTypes['recipes@delete']
);
