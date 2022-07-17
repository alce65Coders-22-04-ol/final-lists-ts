import { useSelector } from 'react-redux';
import { rootState } from '../../../../infrastructure/store/store';
import ingredients from './list.module.css';

export function IngredientsList() {
    const ingredientsState = useSelector(
        (state: rootState) => state.ingredients
    );

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
