import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { AppButton } from '../../../../infrastructure/components/ui/button/app.button';
import AppInput from '../../../../infrastructure/components/ui/input/app.input';
import { AppModal } from '../../../../infrastructure/components/ui/modal/modal';
import { SendState } from '../../interfaces/send.state';
import { ContactModel } from '../../models/contact.model';
import contact from './contact.form.module.css';

export function ContactForm() {
    const initialState: ContactModel = {
        userName: '',
        email: '',
    };

    const initialSendState: SendState = { send: false, userToSend: null };
    const [formState, setFormState] = useState(initialState);
    const [validState, setValidState] = useState(false);
    const [sendState, setSendState] = useState(initialSendState);

    const userRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    /**
     * Cuando quiere acceder a las referencias inmediatamente después del renderizado del componente
     * se debe usar useLayoutEffect en lugar de useEffect
     * useLayoutEffect(() => {
     *     console.log({ formRef });
     * });
     */

    const handleSubmit = (ev: SyntheticEvent) => {
        ev.preventDefault();
        setSendState({ send: true, userToSend: formState });
        setFormState(initialState);
        setValidState(false);
    };

    return (
        <>
            <AppModal
                title={'Contactos'}
                show={sendState.send}
                setShow={useCallback((isShow: boolean) => {
                    setSendState((previous) => ({ ...previous, send: isShow }));
                }, [])}
            >
                <>
                    <p>
                        Gracias{' '}
                        {(sendState.userToSend as ContactModel)?.userName}
                    </p>
                    <p>
                        <span>Te enviaremos información a tu correo </span>
                        <em role={'log'}>
                            {(sendState.userToSend as ContactModel)?.email}
                        </em>
                    </p>
                </>
            </AppModal>
            <h3>Formulario de contacto</h3>
            <form
                className={contact.form}
                onSubmit={handleSubmit}
                ref={formRef}
            >
                <AppInput
                    name="userName"
                    placeholder="Dinos tu nombre"
                    formInfo={{ setFormState, setValidState, formRef }}
                    required={true}
                    ref={userRef}
                    initialValue={formState.userName}
                ></AppInput>
                <AppInput
                    name="email"
                    placeholder="Dinos tu email"
                    type="email"
                    formInfo={{ setFormState, setValidState, formRef }}
                    required={true}
                    ref={emailRef}
                    initialValue={formState.email}
                ></AppInput>
                <div>
                    <AppButton type="submit" disabled={!validState}>
                        Enviar
                    </AppButton>
                </div>
            </form>
        </>
    );
}
