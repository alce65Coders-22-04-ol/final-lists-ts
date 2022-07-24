import { IngredientsList } from '../components/ingredients.list/list';
import { RecipesList } from '../components/recipes.list/list';
import recipes from './recipes.module.css';

function RecipesPage({ title }: { title: string }) {
    return (
        <section className={recipes.host}>
            <h2>{title}</h2>
            <RecipesList></RecipesList>
            <IngredientsList></IngredientsList>
        </section>
    );
}

export default RecipesPage;
