// test-utils.js
import { render as rtlRender } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
// Import your own reducer
import { recipesReducer } from './recipes.reducer';
import { ingredientsReducer } from './ingredients.reducer';

function render(
    ui: JSX.Element,
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
    }: { [key: string]: any } = {}
) {
    function Wrapper({ children }: { children: JSX.Element }) {
        return <Provider store={store}>{children}</Provider>;
    }
    return rtlRender(ui, { wrapper: Wrapper, ...renderOptions });
}

// re-export everything
export * from '@testing-library/react';
// override render method
export { render };
