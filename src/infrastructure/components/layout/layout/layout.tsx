import { appOptionsType } from '../../../../infrastructure/interfaces/app.options';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';
import { Menu } from '../menu/menu';

import layout from './layout.module.css';

export function Layout({
    appTitle,
    company,
    appOptions,
    children,
}: {
    appTitle: string;
    company: string;
    appOptions: appOptionsType;
    children: JSX.Element;
}) {
    return (
        <>
            <Header appTitle={appTitle}>
                <Menu appOptions={appOptions}></Menu>
            </Header>
            <main className={layout.host}>{children}</main>
            <Footer company={company}></Footer>
        </>
    );
}
