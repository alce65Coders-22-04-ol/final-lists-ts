import { UserModel } from '../models/user.model';

export interface Context {
    isLogged: boolean;
    setIsLogged: Function;
    userLogged: UserModel;
    setUserLogged: Function;
}
