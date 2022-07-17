import { IngredientsList } from '../components/ingredients.list/list';
import { RecipesList } from '../components/recipes.list/list';
import recipes from './recipes.module.css';

function RecipesPage() {
    return (
        <section className={recipes.host}>
            <h2>Página Recipes</h2>
            <RecipesList></RecipesList>
            <IngredientsList></IngredientsList>
        </section>
    );
}

export default RecipesPage;
