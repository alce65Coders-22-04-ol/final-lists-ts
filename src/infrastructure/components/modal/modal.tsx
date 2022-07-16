import { useEffect, useRef } from 'react';
import { AppButton } from '../button/app.button';
import modal from './modal.module.css';

export function AppModal({
    children,
    show,
    setShow,
    title = 'Modal Component',
}: {
    children: JSX.Element;
    show: boolean;
    setShow: Function;
    title: string;
}) {
    const dlgRef = useRef<HTMLDialogElement>(null);
    const showAppModal = () => {
        //dlgRef.current?.showModal();
        console.log('Show modal');
        dlgRef.current?.setAttribute('open', 'true');
    };

    const closeAppModal = () => {
        // dlgRef.current?.close();
        console.log('Close modal');
        dlgRef.current?.removeAttribute('open');
        setShow(false);
    };

    useEffect(() => {
        console.log({ show });
        if (show) showAppModal();
        else closeAppModal();
    }, [show]);

    return (
        <dialog className={modal.host} ref={dlgRef}>
            <div className={modal.main}>
                <header className={modal.header}>
                    {title}
                    <AppButton onClick={closeAppModal}>Cerrar</AppButton>
                </header>
                <section className={modal.section}>{children}</section>
                <footer className={modal.footer}>
                    <p>Learning React</p>
                </footer>
            </div>
        </dialog>
    );
}
