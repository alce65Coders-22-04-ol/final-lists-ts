import { render, screen } from '@testing-library/react';
import App from './App';

describe('Given App component', () => {
    describe('When it has been instantiate', () => {
        const appTitle = /Learning React/i;
        const jsx = <App />;
        test('Then it renders app title', () => {
            render(jsx);
            const element = screen.getByText(appTitle);
            expect(element).toBeInTheDocument();
        });
    });
});
