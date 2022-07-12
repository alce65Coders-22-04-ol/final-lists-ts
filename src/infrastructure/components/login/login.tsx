import login from './login.module.css';
import { useLogin } from '../../hooks/use.login';
import { useContext } from 'react';
import { AppContext } from '../../context/context';
import { AppButton } from '../button/app.button';

export function Login() {
    const { isLogged } = useContext(AppContext);
    const { handleClick } = useLogin();

    return (
        <div className={login.host}>
            <AppButton type="button" onClick={handleClick}>
                {isLogged ? 'Logout' : 'Login'}
            </AppButton>
        </div>
    );
}
