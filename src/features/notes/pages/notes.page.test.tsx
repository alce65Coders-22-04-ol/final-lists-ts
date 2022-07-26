import { render, screen } from '@testing-library/react';
import NotesPage from './notes.page';

describe('Given Notes Page component', () => {
    describe('When it has been instantiate', () => {
        test('Then it renders title page', () => {
            // arrange
            const title = 'Página Notes';
            const jsx = <NotesPage title={title} />;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
