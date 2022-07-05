import login from './login.module.css';
import { useLogin } from '../../hooks/use.login';

export function Login() {
    const { isLogged, handleClick } = useLogin();

    return (
        <div className={login.host}>
            <button type="button" onClick={handleClick}>
                {isLogged ? 'Logout' : 'Login'}
            </button>
        </div>
    );
}
