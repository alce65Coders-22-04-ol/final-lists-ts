import { basicResponse } from '../../../infrastructure/interfaces/repository';
import { Repository } from '../../../infrastructure/repositories/CFirestore';

import { iRecipes } from '../models/recipes';

export class RecipesRepo extends Repository<iRecipes, basicResponse> {
    constructor(public collection: string = 'recipes') {
        super(collection);
    }
}
