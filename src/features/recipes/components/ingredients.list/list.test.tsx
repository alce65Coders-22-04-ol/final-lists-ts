import { render, screen } from '../../reducers/test.utils';
import { IngredientsList } from './list';
// import { IngredientsRepo } from '../../services/recipes.repository';
import { IngredientModel } from '../../models/ingredient.model';

// jest.mock('../../services/recipes.repository');

describe('Given IngredientsList component', () => {
    describe(`When it has been instantiate inside a redux Provider of the store
                and it has access to a mocked repository of the data`, () => {
        let mockIngredients: Array<IngredientModel> = [
            { id: '1', name: 'First Ingredient', tags: [], country: 'Spain' },
            { id: '2', name: 'Second Ingredient', tags: [], country: 'Spain' },
        ];
        beforeEach(() => {
            // IngredientsRepo.prototype.getAllItems = jest
            //     .fn()
            //     .mockResolvedValue(mockIngredients);
        });
        test('Then it renders its initial state, without ingredients', () => {
            // arrange
            const jsx = <IngredientsList></IngredientsList>;
            const title = 'Ingredientes';
            // act
            render(jsx);
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();
        });
    });
});
