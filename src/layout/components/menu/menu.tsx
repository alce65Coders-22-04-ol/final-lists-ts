import { Link } from 'react-router-dom';
import menu from './menu.module.css';

export function Menu({ menuOptions }: { menuOptions: Array<any> }) {
    return (
        <nav className={menu.host}>
            <ul>
                {menuOptions.map((item) => (
                    <li key={item.label}>
                        <Link to={item.path}>{item.label}</Link>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
