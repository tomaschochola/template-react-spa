import { useEffect } from 'react';

export interface MetaArgs {
    title?: string;
    description?: string;
}

export function useSeo({ title, description }: MetaArgs): void {
    useEffect(() => {
        if (title !== undefined) {
            document.title = title;
        }

        if (description !== undefined) {
            let d = document.querySelector('meta[name="description"]');

            if (d === null) {
                d = document.createElement('meta');
                d.setAttribute('name', 'description');
                document.head.appendChild(d);
            }

            d.setAttribute('content', description);
        }
    }, [title, description]);
}

export function useDocumentLang(locale: string): void {
    useEffect(() => {
        document.documentElement.lang = locale;
    }, [locale]);
}
