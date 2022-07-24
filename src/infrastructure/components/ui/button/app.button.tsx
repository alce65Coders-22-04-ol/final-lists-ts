import { MouseEventHandler } from 'react';
import button from './app.button.module.css';

export function AppButton({
    children,
    type = 'button',
    disabled = false,
    onClick,
}: {
    children: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    onClick?: MouseEventHandler<HTMLButtonElement>;
}) {
    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={button.host}
        >
            {children}
        </button>
    );
}
