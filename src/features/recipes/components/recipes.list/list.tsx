import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../../infrastructure/store/store';
import { RecipesRepo } from '../../services/recipes.repository';
import * as ac from '../../reducers/recipes.action.creators';
import recipes from './list.module.css';
import { iRecipe } from '../../models/recipe';

let mockData: Partial<iRecipe> = {
    id: '',
    name: 'Pollo al curry',
    ingredients: ['pollo', 'curry'],
};

export function RecipesList() {
    /**
     * Al utilizar redux, useSelector es en cierto modo el equivalente a
     * const [recipesState] = useState(initialState)
     * al definir la variable a la que asignamos la rama del estado seleccionada
     */

    const recipesState = useSelector((state: rootState) => state.recipes);
    const dispatch = useDispatch();

    const [hasNotBeenAdded, setNotAdded] = useState(true);

    const repo = useMemo(() => {
        return new RecipesRepo();
    }, []);

    useEffect(() => {
        repo.getAllItems().then((data) => dispatch(ac.loadRecipesAction(data)));
    }, [repo, dispatch]);

    const handleClickAdd = () => {
        repo.addItem(mockData as iRecipe).then((data) => {
            mockData.id = data.id;
            dispatch(ac.addRecipesAction(data));
            setNotAdded(false);
        });
    };

    const handleClickUpdate = () => {
        mockData = {
            id: mockData.id,
            name: 'Pollo al Curry',
        };
        repo.updateItem(mockData).then((data) =>
            dispatch(ac.updateRecipesAction(data))
        );
    };

    const handleClickDelete = () => {
        repo.deleteItem(mockData.id as string).then((data) => {
            if (data.ok) {
                dispatch(ac.deleteRecipesAction(mockData.id as string));
            }
        });
        setNotAdded(true);
    };

    return (
        <section>
            <h3>Lista de recetas</h3>
            <div className={recipes.buttons}>
                <button onClick={handleClickAdd} hidden={!hasNotBeenAdded}>
                    Añadir receta
                </button>
                <button onClick={handleClickUpdate} hidden={hasNotBeenAdded}>
                    Modificar receta
                </button>
                <button onClick={handleClickDelete} hidden={hasNotBeenAdded}>
                    Borrar receta
                </button>
            </div>
            <ul className={recipes.list}>
                {recipesState.map((item) => (
                    <li key={item.id}>{item.name}</li>
                ))}
            </ul>
        </section>
    );
}
