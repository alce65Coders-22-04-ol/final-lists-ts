import { createReducer } from '@reduxjs/toolkit';
import { iRecipes } from '../models/recipes';
import * as ac from './recipes.action.creators';

const initialState: Array<iRecipes> = [];

export const recipesReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(ac.loadRecipesAction, (state, action) => action.payload)
        .addDefaultCase((state) => state)
);
