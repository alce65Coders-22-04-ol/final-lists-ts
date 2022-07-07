import { useContext, useEffect, useMemo } from 'react';
import {
    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
} from 'firebase/auth';
import { LocalStore } from '../services/local.store';
import { iUser } from '../model/user';
import { AppContext } from '../context/context';

export function useLogin() {
    const { isLogged, setIsLogged } = useContext(AppContext);
    const { setUserLogged } = useContext(AppContext);
    const ls = useMemo(() => new LocalStore<iUser>('Login'), []);

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
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                console.log({ token, user });
                setIsLogged(true);
                const userData: iUser = {
                    uid: result.user.uid,
                    token: token,
                    name: result.user.displayName,
                    email: result.user.email,
                };
                setUserLogged(userData);
                ls.setItem(userData);
            })
            .catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential =
                    GoogleAuthProvider.credentialFromError(error);
                // ...
                console.log({
                    errorCode,
                    errorMessage,
                    email,
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
                });
                ls.removeItems();
            })
            .catch((error) => {
                console.log(error.message);
            });
    };

    return {
        isLogged,
        handleClick,
    };
}
