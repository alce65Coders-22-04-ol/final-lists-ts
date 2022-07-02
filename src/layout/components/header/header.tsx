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
            <img src={logo} className={header.logo} alt="logo" />
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
