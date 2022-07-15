import { iRecipes } from '../models/recipes';

export async function getRecipes(): Promise<Array<iRecipes>> {
    return [
        { id: '1', name: 'algo', ingredients: [] },
        { id: '2', name: 'otra', ingredients: [] },
    ];
}
