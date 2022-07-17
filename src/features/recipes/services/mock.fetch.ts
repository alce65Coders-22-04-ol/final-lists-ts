import { iRecipe } from '../models/recipe';

export async function getRecipes(): Promise<Array<iRecipe>> {
    return [
        { id: '1', name: 'algo', ingredients: [] },
        { id: '2', name: 'otra', ingredients: [] },
    ];
}
