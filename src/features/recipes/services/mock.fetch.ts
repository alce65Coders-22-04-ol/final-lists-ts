import { RecipeModel } from '../models/recipe.model';

export async function getRecipes(): Promise<Array<RecipeModel>> {
    return [
        { id: '1', name: 'algo', ingredients: [] },
        { id: '2', name: 'otra', ingredients: [] },
    ];
}
