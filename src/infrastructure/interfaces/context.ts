import { UserModel } from '../models/user.model';

export interface Context {
    isLogged: boolean;
    setIsLogged: (state: boolean) => void;
    userLogged: UserModel | null;
    setUserLogged: (state: UserModel | null) => void;
}
