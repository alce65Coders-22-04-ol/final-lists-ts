import { actionTypes } from './recipes.action.types';
import { createAction } from '@reduxjs/toolkit';
import { iRecipes } from '../models/recipes';

export const loadRecipesAction = createAction<Array<iRecipes>>(
    actionTypes['recipes@load']
);

export const addRecipesAction = createAction<iRecipes>(
    actionTypes['recipes@add']
);

export const updateRecipesAction = createAction<iRecipes>(
    actionTypes['recipes@update']
);

export const deleteRecipesAction = createAction<string>(
    actionTypes['recipes@delete']
);
