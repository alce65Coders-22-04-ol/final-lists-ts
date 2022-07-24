import { useCallback, useEffect, useRef } from 'react';
import { AppButton } from '../button/app.button';
import modal from './modal.module.css';

interface ModalProps {
    children: JSX.Element;
    show: boolean;
    setShow: Function;
    title?: string;
}

export function AppModal({
    children,
    title = 'Modal Component',
    show,
    setShow,
}: ModalProps) {
    const dlgRef = useRef<HTMLDialogElement>(null);
    const showAppModal = () => {
        /**
         * Por ser un HTMLDialogElement podría usarse
         * dlgRef.current?.showModal()
         * pero no es válido en jest
         */
        dlgRef.current?.setAttribute('open', 'true');
    };

    const closeAppModal = useCallback(() => {
        /**
         * Por ser un HTMLDialogElement podría usarse
         * dlgRef.current?.close()
         * pero no es válido en jest
         */
        dlgRef.current?.removeAttribute('open');
        setShow(false);
    }, [setShow]);

    useEffect(() => {
        console.log({ show });
        if (show) showAppModal();
        else closeAppModal();
    }, [show, closeAppModal]);

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
