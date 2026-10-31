import type { CSSProperties } from 'react';

export function mergeStyles(...properties: (CSSProperties | null | undefined | boolean)[]): CSSProperties {
    const result: CSSProperties = {};

    for (const prop of properties) {
        if (typeof prop === 'object' && prop !== null) {
            Object.assign(result, prop);
        }
    }

    return result;
}
