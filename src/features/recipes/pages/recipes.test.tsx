import { startFirebase } from '../../../infrastructure/services/firebase';
import { render, screen } from '../reducers/test.utils';
import RecipesPage from './recipes';

describe('Given Recipes Page component', () => {
    describe('When it has been instantiate with access to Firebase', () => {
        beforeEach(() => {
            startFirebase();
        });
        test('Then it renders title page', () => {
            // arrange
            const title = 'Página Recipes';
            const jsx = <RecipesPage />;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
