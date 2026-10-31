import { useEffect } from 'react';

export interface MetaArgs {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string | null;
    noindex?: boolean;
}

function setMetaContent(attribute: 'name' | 'property', key: string, value: string | null | undefined): void {
    if (value === undefined) {
        return;
    }

    let meta = document.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);

    if (value === null) {
        meta?.remove();

        return;
    }

    if (meta === null) {
        meta = document.createElement('meta');
        meta.setAttribute(attribute, key);
        document.head.appendChild(meta);
    }

    meta.content = value;
}

export function useSeo({ title, description, keywords, canonical, noindex = false }: MetaArgs): void {
    useEffect(() => {
        if (title !== undefined) {
            document.title = title;
        }

        const metadata = [
            { attribute: 'name', key: 'description', value: description },
            { attribute: 'name', key: 'keywords', value: keywords },
            { attribute: 'property', key: 'og:title', value: title },
            { attribute: 'property', key: 'og:description', value: description },
            { attribute: 'property', key: 'og:url', value: canonical },
            { attribute: 'name', key: 'twitter:title', value: title },
            { attribute: 'name', key: 'twitter:description', value: description },
        ] as const;

        for (const { attribute, key, value } of metadata) {
            setMetaContent(attribute, key, value);
        }

        if (canonical !== undefined) {
            let link = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');

            if (canonical === null) {
                link?.remove();
            } else {
                if (link === null) {
                    link = document.createElement('link');
                    link.rel = 'canonical';
                    document.head.appendChild(link);
                }

                link.href = canonical;
            }
        }
    }, [title, description, keywords, canonical]);

    useEffect(() => {
        if (!noindex) {
            return;
        }

        const existing = document.querySelector<HTMLMetaElement>('meta[name="robots"]');
        const robots = existing ?? document.createElement('meta');
        const original = robots.getAttribute('content');
        const directives = (original ?? '')
            .split(',')
            .map((directive) => directive.trim().toLowerCase())
            .filter((directive) => directive !== '' && directive !== 'index');

        if (!directives.includes('noindex')) {
            directives.push('noindex');
        }

        robots.name = 'robots';
        robots.content = directives.join(', ');

        if (existing === null) {
            document.head.appendChild(robots);
        }

        return () => {
            if (existing === null) {
                robots.remove();
            } else if (original === null) {
                robots.removeAttribute('content');
            } else {
                robots.content = original;
            }
        };
    }, [noindex]);
}

export function useDocumentLang(locale: string): void {
    useEffect(() => {
        document.documentElement.lang = locale;

        const language = new Intl.Locale(locale).maximize();
        const ogLocale = [language.language, language.region].filter(Boolean).join('_');

        setMetaContent('property', 'og:locale', ogLocale);
    }, [locale]);
}
