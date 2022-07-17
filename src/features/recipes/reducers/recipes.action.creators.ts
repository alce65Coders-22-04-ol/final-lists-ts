import { actionTypes } from './recipes.action.types';
import { createAction } from '@reduxjs/toolkit';
import { iRecipe } from '../models/recipe';

export const loadRecipesAction = createAction<Array<iRecipe>>(
    actionTypes['recipes@load']
);

export const addRecipesAction = createAction<iRecipe>(
    actionTypes['recipes@add']
);

export const updateRecipesAction = createAction<iRecipe>(
    actionTypes['recipes@update']
);

export const deleteRecipesAction = createAction<string>(
    actionTypes['recipes@delete']
);
