import { createReducer } from '@reduxjs/toolkit';
import { iRecipe } from '../models/recipe';
import * as ac from './recipes.action.creators';

const initialState: Array<iRecipe> = [];

export const recipesReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(ac.loadRecipesAction, (_state, action) => action.payload)
        .addCase(ac.addRecipesAction, (state, action) => [
            ...state,
            action.payload,
        ])
        .addCase(ac.updateRecipesAction, (state, action) =>
            state.map((item) =>
                item.id === action.payload.id ? action.payload : item
            )
        )
        .addCase(ac.deleteRecipesAction, (state, action) =>
            state.filter((item) => action.payload !== item.id)
        )
        .addDefaultCase((state) => state)
);
