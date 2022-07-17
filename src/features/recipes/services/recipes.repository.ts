import { basicResponse } from '../../../infrastructure/interfaces/repository';
import { Repository } from '../../../infrastructure/repositories/CFirestore';

import { iRecipe } from '../models/recipe';

export class RecipesRepo extends Repository<iRecipe, basicResponse> {
    constructor(public collection: string = 'recipes') {
        super(collection);
    }
}
