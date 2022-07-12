import React, { useState, useEffect } from 'react';
import { SyntheticEvent } from 'react';
import input from './app.input.module.css';

interface iFormInfo {
    setFormState: Function;
    setValidState: Function;
    formRef: React.RefObject<HTMLFormElement> | null;
}

function AppInput<T>(
    {
        placeholder,
        name,
        type = 'text',
        formInfo,
        required = false,
        pattern,
        maxLength,
        minLength,
        initialValue = '',
    }: {
        placeholder: string;
        name: string;
        type?: string;
        formInfo: iFormInfo;
        required?: boolean;
        pattern?: string | undefined;
        maxLength?: number | undefined;
        minLength?: number | undefined;
        initialValue?: string;
    },
    ref: React.ForwardedRef<HTMLInputElement>
) {
    const initialState = { value: '', valid: false, errorMessage: '' };
    const [inputState, setInputState] = useState(initialState);

    useEffect(() => {
        setInputState((prev) => ({ ...prev, value: initialValue }));
    }, [initialValue]);

    const handleChange = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        setInputState({
            ...inputState,
            value: element.value,
        });
    };

    const handleBlur = (ev: SyntheticEvent) => {
        const element = ev.target as HTMLFormElement;
        const form = (formInfo.formRef as React.RefObject<HTMLFormElement>)
            .current as HTMLFormElement;
        formInfo.setFormState((prev: T) => ({
            ...prev,
            [element.name]: inputState.value,
        }));
        formInfo.setValidState(form.checkValidity());
        setInputState({
            value: element.value,
            valid: element.checkValidity(),
            errorMessage: element.validationMessage,
        });
        // console.log('Validity:', element.validity);
    };

    let jsx: JSX.Element = (
        <input
            ref={ref}
            className={input.host}
            type={type}
            name={name}
            value={(inputState as unknown as { [key: string]: string }).value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder={placeholder}
            required={required}
            pattern={pattern}
            maxLength={maxLength}
            minLength={minLength}
        />
    );

    return (
        <>
            {jsx}
            <p className={input.error}>
                {!inputState.valid && inputState.errorMessage}
            </p>
        </>
    );
}

export default React.forwardRef(AppInput);
