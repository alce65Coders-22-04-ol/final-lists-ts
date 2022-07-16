import { createReducer } from '@reduxjs/toolkit';
import { iIngredients } from '../models/ingredients';
import * as ac from './ingredients.action.creators';

const initialState: Array<iIngredients> = [];

export const ingredientsReducer = createReducer(initialState, (builder) =>
    builder
        // .addCase(ac.loadRecipesAction, (state, action) => action.payload)
        // .addCase(ac.addRecipesAction, (state, action) => [
        //     ...state,
        //     action.payload,
        // ])
        // .addCase(ac.updateRecipesAction, (state, action) =>
        //     state.map((item) =>
        //         item.id === action.payload.id ? action.payload : item
        //     )
        // )
        // .addCase(ac.deleteRecipesAction, (state, action) =>
        //     state.filter((item) => action.payload !== item.id)
        // )
        .addDefaultCase((state) => state)
);
