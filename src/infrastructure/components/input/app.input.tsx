import { SyntheticEvent } from 'react';
import input from './app.input.module.css';

export function AppInputText<T>({
    placeholder,
    name,
    formState,
    setFormState,
    required,
}: {
    placeholder: string;
    name: string;
    formState: T;
    setFormState: Function;
    required: string;
}) {
    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setFormState({ ...formState, [element.name]: element.value });
    };

    let jsx: JSX.Element;
    if (required === 'true') {
        jsx = (
            <input
                className={input.host}
                type="text"
                name={name}
                value={
                    (formState as unknown as { [key: string]: string })[name]
                }
                onChange={handleChange}
                placeholder={placeholder}
                required
            />
        );
    } else {
        jsx = (
            <input
                className={input.host}
                type="text"
                name={name}
                value={
                    (formState as unknown as { [key: string]: string })[name]
                }
                onChange={handleChange}
                placeholder={placeholder}
            />
        );
    }

    return (
        <>
            {jsx}
            <p className={input.error}></p>
        </>
    );
}
