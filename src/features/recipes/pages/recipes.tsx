import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { rootState } from '../../../infrastructure/store/store';
import { loadRecipesAction } from '../reducers/recipes.action.creators';
import { getRecipes } from '../services/mock.fetch';
import recipes from './recipes.module.css';

function RecipesPage() {
    // const [recipesState] = useState(second)
    const recipesState = useSelector((state: rootState) => state.recipes);
    const dispatch = useDispatch();

    useEffect(() => {
        getRecipes().then((data) => dispatch(loadRecipesAction(data)));
    }, [dispatch]);

    return (
        <section className={recipes.host}>
            <h2>Página Recipes</h2>
            {recipesState.map((item) => (
                <p>{item.name}</p>
            ))}
        </section>
    );
}

export default RecipesPage;
