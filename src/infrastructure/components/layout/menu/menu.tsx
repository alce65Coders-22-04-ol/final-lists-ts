import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../../../context/context';
import menu from './menu.module.css';

export function Menu({ appOptions }: { appOptions: Array<any> }) {
    const { isLogged } = useContext(AppContext);
    return (
        <nav className={menu.host}>
            <ul>
                {appOptions.map((item) => {
                    const privateRoute = !isLogged && item.isProtected;
                    return (
                        <li
                            key={item.label}
                            className={privateRoute ? menu.protected : ''}
                        >
                            <Link to={item.path}>{item.label}</Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
