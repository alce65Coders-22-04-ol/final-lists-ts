import { createReducer } from '@reduxjs/toolkit';
import { iIngredient } from '../models/ingredient';
import * as ac from './ingredients.action.creators';

const initialState: Array<iIngredient> = [];

export const ingredientsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(ac.loadIngredientsAction, (state, action) => action.payload)
        .addCase(ac.addIngredientsAction, (state, action) => [
            ...state,
            action.payload,
        ])
        .addCase(ac.updateIngredientsAction, (state, action) =>
            state.map((item) =>
                item.id === action.payload.id ? action.payload : item
            )
        )
        .addCase(ac.deleteIngredientsAction, (state, action) =>
            state.filter((item) => action.payload !== item.id)
        )
        .addDefaultCase((state) => state)
);