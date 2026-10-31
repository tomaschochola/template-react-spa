import type { NavigateOptions, To } from 'react-router';

declare module '@react-types/shared' {
    interface RouterConfig {
        routerOptions: NavigateOptions;
        href: To;
    }
}
