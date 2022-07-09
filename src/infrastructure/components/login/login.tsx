import login from './login.module.css';
import { useLogin } from '../../hooks/use.login';
import { useContext } from 'react';
import { AppContext } from '../../context/context';

export function Login() {
    const { isLogged } = useContext(AppContext);
    const { handleClick } = useLogin();

    return (
        <div className={login.host}>
            <button type="button" onClick={handleClick}>
                {isLogged ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}
