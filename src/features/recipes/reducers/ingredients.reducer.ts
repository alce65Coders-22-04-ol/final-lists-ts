import { createReducer } from '@reduxjs/toolkit';
import { IngredientModel } from '../models/ingredient.model';
import * as ac from './ingredients.action.creators';

const initialState: Array<IngredientModel> = [];

export const ingredientsReducer = createReducer(initialState, (builder) =>
    builder
        .addCase(ac.loadIngredientsAction, (_state, action) => action.payload)
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
