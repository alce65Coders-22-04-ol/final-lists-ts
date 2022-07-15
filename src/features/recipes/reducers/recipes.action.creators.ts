import { actionTypes } from './recipes.action.types';
import { createAction } from '@reduxjs/toolkit';
import { iRecipes } from '../models/recipes';

export const loadRecipesAction = createAction<Array<iRecipes>>(
    actionTypes['recipes@load']
);
