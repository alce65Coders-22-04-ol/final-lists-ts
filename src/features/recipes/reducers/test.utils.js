// test-utils.js
import React from 'react';
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import { recipesReducer } from './recipes.reducer';
import { ingredientsReducer } from './ingredients.reducer';

function render(
    ui,
    {
        preloadedState,
        store = configureStore({
            reducer: {
                recipes: recipesReducer,
                ingredients: ingredientsReducer,
            },
            preloadedState,
        }),
        ...renderOptions
    } = {}
) {
    function Wrapper({ children }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
