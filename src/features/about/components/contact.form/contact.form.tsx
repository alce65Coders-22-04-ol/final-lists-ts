import { SyntheticEvent, useCallback, useRef, useState } from 'react';
import { AppButton } from '../../../../infrastructure/components/button/app.button';
import AppInput from '../../../../infrastructure/components/input/app.input';
import { AppModal } from '../../../../infrastructure/components/modal/modal';
import { iSendState } from '../../interfaces/send.state';
import { iContact } from '../../models/contact';
import contact from './contact.form.module.css';

export function ContactForm() {
    const initialState: iContact = {
        userName: '',
        email: '',
    };

    const initialSendState: iSendState = { send: false, userToSend: null };
    const [formState, setFormState] = useState(initialState);
    const [validState, setValidState] = useState(false);
    const [sendState, setSendState] = useState(initialSendState);

    const userRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    const formRef = useRef<HTMLFormElement>(null);

    // useLayoutEffect(() => {
    //     console.log({ formRef });
    // });

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
                        Gracias {(sendState.userToSend as iContact)?.userName}
                    </p>
                    <p>
                        <span>Te enviaremos información a tu correo </span>
                        <em role={'log'}>
                            {(sendState.userToSend as iContact)?.email}
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
