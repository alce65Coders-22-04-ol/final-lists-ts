import { iUser } from '../models/user';

export interface iContext {
    isLogged: boolean;
    setIsLogged: Function;
    userLogged: iUser;
    setUserLogged: Function;
}
