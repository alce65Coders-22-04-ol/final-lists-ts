import menu from './menu.module.css';
export function Menu({ menuOptions }: { menuOptions: Array<any> }) {
    return (
        <nav className={menu.host}>
            <ul>
                {menuOptions.map((item) => (
                    <li key={item.label}>
                        <a href={item.path}>{item.label}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}
