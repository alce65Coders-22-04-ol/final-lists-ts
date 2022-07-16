import { actionTypes } from './ingredients.action.types';
import { createAction } from '@reduxjs/toolkit';
import { iIngredients } from '../models/ingredients';

export const loadIngredientsAction = createAction<Array<iIngredients>>(
    actionTypes['ingredients@load']
);

export const addIngredientsAction = createAction<iIngredients>(
    actionTypes['ingredients@add']
);

export const updateIngredientsAction = createAction<iIngredients>(
    actionTypes['ingredients@update']
);

export const deleteIngredientsAction = createAction<string>(
    actionTypes['ingredients@delete']
);
