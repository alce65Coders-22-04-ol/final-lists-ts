import { getFirestore, getDocs } from 'firebase/firestore';
import { render, screen } from '../reducers/test.utils';
import RecipesPage from './recipes.page';

jest.mock('firebase/firestore');

describe('Given Recipes Page component', () => {
    describe('When it has been instantiate with access to Firebase', () => {
        test('Then it renders title page', () => {
            // arrange
            getFirestore as jest.Mock;
            (getDocs as jest.Mock).mockReturnValue([
                {
                    data: jest.fn().mockReturnValue({}),
                },
            ]);
            const title = 'Página Recipes';
            const jsx = <RecipesPage title={title} />;
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
