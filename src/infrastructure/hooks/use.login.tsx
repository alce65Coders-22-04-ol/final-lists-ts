import { useContext, useEffect, useMemo } from 'react';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';
import { LocalStore } from '../services/local.store';
import { UserModel } from '../models/user.model';
import { AppContext } from '../context/context';

export function useLogin() {
    const { isLogged, setIsLogged } = useContext(AppContext);
    const { setUserLogged } = useContext(AppContext);
    const ls = useMemo(() => new LocalStore<UserModel>('Login'), []);

    useEffect(() => {
        const storeUser = ls.getItem();
        if (storeUser) {
            setUserLogged(storeUser);
            setIsLogged(true);
        }
    }, [ls, setIsLogged, setUserLogged]);

    const handleClick = () => {
        if (isLogged) {
            doLogout();
        } else {
            doLogin();
        }
    };

    const doLogin = () => {
        const provider = new GoogleAuthProvider();
        const auth = getAuth();

        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential =
                    GoogleAuthProvider.credentialFromResult(result);
                const error: any = new Error('No credential');
                error.code = '';
                error.customData = { email: '' };
                if (!credential) throw error;
                // For more info console.log({ token, user });
                setIsLogged(true);
                const userData: UserModel = {
                    uid: result.user.uid,
                    token: credential.accessToken,
                    name: result.user.displayName,
                    email: result.user.email,
                };
                setUserLogged(userData);
                ls.setItem(userData);
            })
            .catch((error) => {
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                console.error({
                    errorCode: error.code,
                    errorMessage: error.message,
                    email: error.customData.email,
                    credential,
                });
            });
    };

    const doLogout = () => {
        signOut(getAuth())
            .then(() => {
                setIsLogged(false);
                setUserLogged({
                    uid: '',
                    name: '',
                    email: '',
                    token: '',
                });
                ls.removeItems();
            })
            .catch((error) => {
                console.error(error.message);
            });
    };

    return {
        handleClick,
    };
}
