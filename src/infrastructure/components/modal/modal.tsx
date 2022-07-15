import { useEffect, useRef } from 'react';
import { AppButton } from '../button/app.button';
import modal from './modal.module.css';

export function AppModal({
    children,
    show,
    title = 'Modal Component',
}: {
    children: JSX.Element;
    show: boolean;
    title: string;
}) {
    const dlgRef = useRef<HTMLDialogElement>(null);
    const showAppModal = () => {
        dlgRef.current?.showModal();
        // dlgRef.current?.setAttribute('Open', 'true');
    };

    const closeAppModal = () => {
        // dlgRef.current?.close();
        dlgRef.current?.removeAttribute('Open');
    };

    useEffect(() => {
        if (show) showAppModal();
        else closeAppModal();
    }, [show]);

    return (
        <dialog className={modal.host} ref={dlgRef}>
            <header>
                {title}
                <AppButton onClick={closeAppModal}>Cerrar</AppButton>
            </header>
            <section>{children}</section>
            <footer>
                <p>React App</p>
            </footer>
        </dialog>
    );
}
