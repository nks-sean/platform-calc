import { type ReactNode } from 'react';

interface SectionProps {
    title?: string;
    children: ReactNode;
    className?: string;
}

export function Section({ title, children, className = '' }: SectionProps) {
    return (
        <div className={`section ${className}`}>
            {title && <h3>{title}</h3>}
            {children}
        </div>
    );
}
