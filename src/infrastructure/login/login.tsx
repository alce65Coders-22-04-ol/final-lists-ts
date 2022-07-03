import { useState } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import login from './login.module.css';

export function Login() {
    const [isLogged, setIsLogged] = useState(false);

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
                if (!credential) throw new Error('No credential');
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                // ...
                console.log({ token, user });
                setIsLogged(true);
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

    const doLogout = () => {};

    return (
        <div className={login.host}>
            <button type="button" onClick={handleClick}>
                {isLogged ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}
