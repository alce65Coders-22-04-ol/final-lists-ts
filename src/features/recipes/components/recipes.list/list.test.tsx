import { fireEvent, render, screen, waitFor } from '../../reducers/test.utils';
import { RecipesList } from './list';
import { RecipesRepo } from '../../services/recipes.repository';
import { RecipeModel } from '../../models/recipe.model';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

jest.mock('../../services/recipes.repository');

describe('Given RecipesList component', () => {
    describe(`When it has been instantiate inside a redux Provider of the store
                and it has access to a mocked repository of the data`, () => {
        let mockRecipes: Array<RecipeModel>;
        let mockNewRecipe: RecipeModel;
        let buttons;
        let jsx: JSX.Element;
        beforeEach(() => {
            mockRecipes = [
                { id: '1', name: 'First Test Recipe', ingredients: [] },
                { id: '2', name: 'Second Test Recipe', ingredients: [] },
            ];
            mockNewRecipe = {
                id: '3',
                name: 'Pollo al curry',
                ingredients: [],
            };
            RecipesRepo.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue(mockRecipes);
            RecipesRepo.prototype.addItem = jest
                .fn()
                .mockResolvedValue(mockNewRecipe);
            RecipesRepo.prototype.updateItem = jest.fn().mockResolvedValue({
                ...mockNewRecipe,
                name: 'Pollo al Curry',
            });
            RecipesRepo.prototype.deleteItem = jest.fn().mockResolvedValue({
                ok: true,
            });
            // arrange
            jsx = <RecipesList></RecipesList>;
        });
        test(`Then it renders its initial state, and after that, 
                the received Recipes should be rendered`, async () => {
            // arrange
            const title = 'Lista de recetas';
            // act
            render(jsx);
            buttons = screen.getAllByRole('button');
            // assert
            const element = screen.getByText(title);
            expect(element).toBeInTheDocument();

            expect(RecipesRepo.prototype.getAllItems).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText('First Test Recipe');
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the user click "Añadir receta" button, 
                "Pollo al curry" should be render`, async () => {
            // handleClickAdd -> RecipesRepo.prototype.addItem
            // arrange
            const userInputMock = 'Pollo al curry';
            // act
            render(jsx);
            buttons = screen.getAllByRole('button');
            userEvent.click(buttons[0]);
            expect(RecipesRepo.prototype.addItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText(userInputMock);
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the user click "Modificar receta" button
                "Pollo al Curry" should be render`, async () => {
            //   handleClickUpdate -> RecipesRepo.prototype.updateItem
            // arrange
            const userInputMock = 'Pollo al Curry';
            mockRecipes = [...mockRecipes, mockNewRecipe];
            RecipesRepo.prototype.getAllItems = jest
                .fn()
                .mockResolvedValue(mockRecipes);
            // act
            render(jsx);
            buttons = screen.getAllByRole('button', { hidden: true });
            buttons[1].removeAttribute('hidden');
            buttons[2].removeAttribute('hidden');
            userEvent.click(buttons[1]);

            expect(RecipesRepo.prototype.updateItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.getByText(userInputMock);
                expect(element).toBeInTheDocument();
            });
        });
        test(`If the user click "Borrar receta" button
               "Pollo al Curry" should not be render`, async () => {
            // handleClickDelete -> RecipesRepo.prototype.deleteItem
            // arrange
            const userInputMock = 'Pollo al Curry';
            // act
            render(jsx);
            buttons = screen.getAllByRole('button', { hidden: true });
            buttons[1].removeAttribute('hidden');
            buttons[2].removeAttribute('hidden');
            userEvent.click(buttons[2]);
            expect(RecipesRepo.prototype.deleteItem).toHaveBeenCalled();
            await waitFor(() => {
                const element = screen.queryByText(userInputMock);
                expect(element).toBeNull();
            });
        });
        test(`If the user click "Borrar receta" button 
                for a non existing item
               nothing should be render`, async () => {
            // handleClickDelete -> RecipesRepo.prototype.deleteItem
            // arrange
            RecipesRepo.prototype.deleteItem = jest.fn().mockResolvedValue({
                ok: false,
            });

            // act
            // eslint-disable-next-line testing-library/no-unnecessary-act
            await act(async () => {
                // formato usado para corregir el warning que aparece al final
                render(jsx);
            });

            buttons = screen.getAllByRole('button', {
                hidden: true,
            });
            buttons[1].removeAttribute('hidden');
            buttons[2].removeAttribute('hidden');
            userEvent.click(buttons[2]);

            expect(RecipesRepo.prototype.deleteItem).toHaveBeenCalled();

            //   Warning: An update to RecipesList inside a test was not wrapped in act(...).

            //   When testing, code that causes React state updates should be wrapped into act(...):

            //   act(() => {
            //     /* fire events that update state */
            //   });
            //   /* assert on the output */

            //   This ensures that you're testing the behavior the user would see in the browser.
            //   Learn more at https://reactjs.org/link/wrap-tests-with-act

            //   RecipesList
            //   (..\src\features\recipes\components\recipes.list\list.tsx:17:26)
            //  const recipesState = useSelector((state: rootState) => state.recipes);
        });
    });
});
