import { actionTypes } from './ingredients.action.types';
import { createAction } from '@reduxjs/toolkit';
import { IngredientModel } from '../models/ingredient.model';

export const loadIngredientsAction = createAction<Array<IngredientModel>>(
    actionTypes['ingredients@load']
);

export const addIngredientsAction = createAction<IngredientModel>(
    actionTypes['ingredients@add']
);

export const updateIngredientsAction = createAction<IngredientModel>(
    actionTypes['ingredients@update']
);

export const deleteIngredientsAction = createAction<string>(
    actionTypes['ingredients@delete']
);
