import { Login } from '../../../infrastructure/components/login/login';
import header from './header.module.css';
export function Header({
    appTitle,
    children,
}: {
    appTitle: string;
    children: JSX.Element;
}) {
    const logo = './logo.svg';
    return (
        <header className={header.host}>
            <div className={header.top}>
                <img src={logo} className={header.logo} alt="logo" />
                <Login></Login>
            </div>

            <a
                className={header.link}
                href="https://reactjs.org"
                target="_blank"
                rel="noopener noreferrer"
            >
                <h1>{appTitle}</h1>
            </a>
            {children}
        </header>
    );
}
