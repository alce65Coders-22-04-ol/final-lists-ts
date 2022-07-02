import { menuOptionsType } from '../../interfaces/menu-options';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';

import layout from './layout.module.css';

export function Layout({
    appTitle,
    company,
    menuOptions,
    children,
}: {
    appTitle: string;
    company: string;
    menuOptions: menuOptionsType;
    children: JSX.Element;
}) {
    return (
        <>
            <Header appTitle={appTitle}>
                <Menu menuOptions={menuOptions}></Menu>
            </Header>
            <main className={layout.host}>{children}</main>
            <Footer company={company}></Footer>
        </>
    );
}
