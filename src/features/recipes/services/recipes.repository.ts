import { basicResponse } from '../../../infrastructure/interfaces/repository';
import { CFirestoreRepository } from '../../../infrastructure/repositories/CFirestore.repository';

import { RecipeModel } from '../models/recipe.model';

export class RecipesRepo extends CFirestoreRepository<
    RecipeModel,
    basicResponse
> {
    constructor(public collection: string = 'recipes') {
        super(collection);
    }
}
