import { iUser } from '../model/user';

export interface iContext {
    isLogged: boolean;
    setIsLogged: Function;
    userLogged: iUser;
    setUserLogged: Function;
}
