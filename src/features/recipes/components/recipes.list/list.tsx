import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../../infrastructure/store/store';
import { RecipesRepo } from '../../services/recipes.repository';
import * as ac from '../../reducers/recipes.action.creators';
import recipes from './list.module.css';

export function RecipesList() {
    // const [recipesState] = useState(second)
    const recipesState = useSelector((state: rootState) => state.recipes);
    const dispatch = useDispatch();

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
        <section>
            <div className={recipes.buttons}>
                <button onClick={handleClickAdd}>Añadir receta</button>
                <button onClick={handleClickUpdate}>Modificar receta</button>
                <button onClick={handleClickDelete}>Borrar receta</button>
            </div>
            <ul className={recipes.list}>
                {recipesState.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </section>
    );
}
