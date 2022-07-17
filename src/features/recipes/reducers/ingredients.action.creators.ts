import { actionTypes } from './ingredients.action.types';
import { createAction } from '@reduxjs/toolkit';
import { iIngredient } from '../models/ingredient';

export const loadIngredientsAction = createAction<Array<iIngredient>>(
    actionTypes['ingredients@load']
);

export const addIngredientsAction = createAction<iIngredient>(
    actionTypes['ingredients@add']
);

export const updateIngredientsAction = createAction<iIngredient>(
    actionTypes['ingredients@update']
);

export const deleteIngredientsAction = createAction<string>(
    actionTypes['ingredients@delete']
);
