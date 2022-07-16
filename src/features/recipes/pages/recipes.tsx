import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../infrastructure/store/store';
import * as ac from '../reducers/recipes.action.creators';
import { RecipesRepo } from '../services/recipes.repository';
import recipes from './recipes.module.css';

function RecipesPage() {
    // const [recipesState] = useState(second)
    const recipesState = useSelector((state: rootState) => state.recipes);
    const dispatch = useDispatch();

    const ingredientsState = useSelector(
        (state: rootState) => state.ingredients
    );

    const repo = useMemo(() => {
        return new RecipesRepo();
    }, []);

    useEffect(() => {
        repo.getAllItems().then((data) => dispatch(ac.loadRecipesAction(data)));
    }, [repo, dispatch]);

    const handleClickAdd = () => {
        const mockData = {
            id: '',
            name: 'Pollo al curry',
            ingredients: ['pollo', 'curry'],
        };
        repo.addItem(mockData).then((data) =>
            dispatch(ac.addRecipesAction(data))
        );
    };

    const handleClickUpdate = () => {
        const mockData = {
            id: 'wCTpVl3ar3EZfD46j69l',
            name: 'Pollo al Curry',
        };
        repo.updateItem(mockData).then((data) =>
            dispatch(ac.updateRecipesAction(data))
        );
    };

    const handleClickDelete = () => {
        const mockData = {
            id: 'wCTpVl3ar3EZfD46j69l',
        };
        repo.deleteItem(mockData.id).then((data) => {
            if (data.ok) {
                dispatch(ac.deleteRecipesAction(mockData.id));
            }
        });
    };

    return (
        <section className={recipes.host}>
            <h2>Página Recipes</h2>
            <button onClick={handleClickAdd}>Añadir receta</button>
            <button onClick={handleClickUpdate}>Modificar receta</button>
            <button onClick={handleClickDelete}>Borrar receta</button>
            {recipesState.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
            <h2>Ingredientes</h2>
            {ingredientsState.map((item) => (
                <p key={item.id}>{item.name}</p>
            ))}
        </section>
    );
}

export default RecipesPage;
