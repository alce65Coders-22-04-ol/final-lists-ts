import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../../infrastructure/store/store';
import { IngredientModel } from '../../models/ingredient.model';
import ingredients from './list.module.css';
import * as ac from '../../reducers/ingredients.action.creators';

export function IngredientsList() {
    const ingredientsState = useSelector(
        (state: rootState) => state.ingredients
    );
    const dispatch = useDispatch();

    useEffect(() => {
        const mockIngredients: Array<IngredientModel> = [
            { id: '1', name: 'First Ingredient', tags: [], country: 'Spain' },
            { id: '2', name: 'Second Ingredient', tags: [], country: 'Spain' },
        ];
        dispatch(ac.loadIngredientsAction(mockIngredients));
    }, [dispatch]);

    return (
        <section>
            <h3>Ingredientes</h3>
            <ul className={ingredients.list}>
                {ingredientsState.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </section>
    );
}
