import { type ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'ghost';
}

export function Button({ variant = 'primary', className = '', ...props }: ButtonProps) {
    return (
        <button
            className={`${variant} ${className}`}
            {...props}
        />
    );
}
